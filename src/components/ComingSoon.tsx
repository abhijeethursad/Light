import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center bg-white dark:bg-black text-center gap-6">
      

        {/* Main Message */}
        <h2 className="text-4xl font-extrabold text-black dark:text-white animate-pulse flex">
            🚧 Coming Soon<p className="animate-bounce">!</p>
        </h2>

        {/* Subtitle */}
        <p className="uppercase tracking-wides text-sm">
            under construction
        </p>

        <div className="flex items-center text-center justify-center">
            <AiOutlineLoading3Quarters size={30} className="animate-spin"/>
        </div>

      </div>
  );
}

export default ComingSoon;