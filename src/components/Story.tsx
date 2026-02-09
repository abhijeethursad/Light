import React from "react";
import Image from "next/image";

interface StoryProps {
  img: string;
  username: string;
}

function Story({ img, username }: StoryProps) {
  return (
    <div className="flex flex-col items-center gap-1">

      <div className="rounded-full bg-gradient-to-tr from-purple-400 via-pink-500 to-red-500 p-[3px]">
        <div className="rounded-full bg-white p-[2px] dark:bg-black">
          <Image
            src={img}
            alt={username}
            width={90}
            height={90}
            className="rounded-full object-cover aspect-square"
            placeholder="blur" 
            blurDataURL="..."

          />
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-900 dark:text-white truncate w-20">
          {username}
        </p>
      </div>

    </div>
  );
}

export default Story;