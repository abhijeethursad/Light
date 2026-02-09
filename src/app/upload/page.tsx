"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  // New State for Details
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("Light"); // Default user
  const [songName, setSongName] = useState("Original Audio");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a video first");
      return;
    }

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    // Append the text details to send to the server
    formData.append("description", description);
    formData.append("username", username);
    formData.append("songName", songName);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("✅ Upload & Data Saved!");
        setFile(null);
        setDescription("");
        // Reset file input visually
        (document.getElementById("fileInput") as HTMLInputElement).value = "";
      } else {
        setMessage("❌ Upload Failed");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-black text-white flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="p-4 pt-6 flex items-center gap-4">
        <Link href="/videos">
          <IoIosArrowBack size={28} />
        </Link>
        <h1 className="text-xl font-bold">Upload Reel</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-start p-6 gap-6 w-full max-w-md mx-auto">
        
        {/* File Picker */}
        <div className="w-full border-2 border-dashed border-gray-700 rounded-xl h-48 flex flex-col items-center justify-center bg-gray-900/50 hover:bg-gray-900 transition-colors relative">
          <input 
            id="fileInput"
            type="file" 
            accept="video/*" 
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          {file ? (
            <div className="text-center p-4">
                <p className="text-green-400 font-bold mb-2">Selected:</p>
                <p className="text-sm text-gray-300 break-all">{file.name}</p>
            </div>
          ) : (
            <div className="text-center">
                <FaCloudUploadAlt size={40} className="mx-auto text-gray-500 mb-2"/>
                <p className="text-gray-400 font-bold">Tap to Select Video</p>
            </div>
          )}
        </div>

        {/* Inputs */}
        <div className="w-full flex flex-col gap-4">
            <div>
                <label className="text-xs text-gray-400 ml-1">Caption</label>
                <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write a caption..."
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500"
                    rows={3}
                />
            </div>

            <div>
                <label className="text-xs text-gray-400 ml-1">Username</label>
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500"
                />
            </div>

            <div>
                <label className="text-xs text-gray-400 ml-1">Music / Audio Name</label>
                <input 
                    type="text"
                    value={songName}
                    onChange={(e) => setSongName(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500"
                />
            </div>
        </div>

        {/* Post Button */}
        <button 
          onClick={handleUpload}
          disabled={uploading || !file}
          className={`w-full py-3 rounded-lg font-bold text-lg transition-all mt-2 ${
            uploading || !file 
            ? "bg-gray-800 text-gray-500 cursor-not-allowed" 
            : "bg-blue-600 hover:bg-blue-500 text-white"
          }`}
        >
          {uploading ? "Posting..." : "Post Reel"}
        </button>

        {message && (
          <p className={`text-sm font-semibold ${message.includes("Success") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadPage;