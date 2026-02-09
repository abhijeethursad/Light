import { NextResponse } from "next/server";
import path from "path";
import { writeFile, readFile } from "fs/promises";

export const POST = async (req) => {
  const formData = await req.formData();

  const file = formData.get("file");
  const description = formData.get("description") || "No description";
  const username = formData.get("username") || "User";
  const songName = formData.get("songName") || "Original Audio";

  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  // 1. Save the Video File
  const buffer = Buffer.from(await file.arrayBuffer());
  // Create a unique filename to avoid conflicts (add timestamp)
  const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");
  
  try {
    await writeFile(
      path.join(process.cwd(), "public/videos/" + filename),
      buffer
    );
  } catch (error) {
    return NextResponse.json({ Message: "Failed to save video file", status: 500 });
  }

  // 2. Update videodata.tsx
  // NOTE: This assumes your videodata.tsx ends with "];"
  try {
    const filePath = path.join(process.cwd(), "src/app/constants/videodata.tsx");
    let fileContent = await readFile(filePath, "utf-8");

    // Construct the new object as a string
    const newVideoEntry = `
  {
    id: ${Date.now()},
    username: "${username}",
    title: "${description.substring(0, 20)}...",
    url: "/videos/${filename}",
    thumb: "/videos/default_thumb.jpg", // Placeholder thumb
    description: "${description}",
    likes: 0,
    comments: 0,
    music: "${songName}"
  },`;

    // Find the last closing bracket "];" and insert our new entry before it
    // We look for the last occurrence of ']'
    const lastBracketIndex = fileContent.lastIndexOf("]");
    
    if (lastBracketIndex !== -1) {
        // Insert the new entry before the last ']'
        const updatedContent = 
            fileContent.substring(0, lastBracketIndex) + 
            newVideoEntry + 
            "\n" + 
            fileContent.substring(lastBracketIndex);

        await writeFile(filePath, updatedContent, "utf-8");
    }

    return NextResponse.json({ Message: "Success", status: 201 });

  } catch (error) {
    console.log("Error updating video data: ", error);
    return NextResponse.json({ Message: "Failed to update data", status: 500 });
  }
};