import React from "react";
import ComingSoon from "@/components/ComingSoon";

function MaessagesPage() {
  return (
  <>
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black gap-2">
      {/* Title */}
        <h1 className="text-xl font-bold">
          Maessages
        </h1>

        <ComingSoon/>

    </div>
  </>
  )
}

export default MaessagesPage;