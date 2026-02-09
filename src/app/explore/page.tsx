import React from "react";
import ComingSoon from "@/components/ComingSoon";
import { FaArrowRight, FaBolt } from "react-icons/fa";




function ExplorePage() {
  return (
  <>
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black gap-2">
      {/* Title */}
        <h1 className="text-xl font-bold">
          Explore
        </h1>

        <ComingSoon/>

                    <div className="w-20 h-20 bg-gradient-to-br from-white to-gray-400 rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                        <FaBolt className="text-black text-4xl" />
                    </div>

    </div>
  </>
    )
}

export default ExplorePage;