import React from "react";
import ComingSoon from "@/components/ComingSoon";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";


function Notifications() {
  return (
  <>
  <div className="sticky top-0 left-0 right-0 z-50">
    <div className="flex items-center gap-5 px-5 py-4  bg-white dark:bg-black backdrop-blur-xl">
      <Link
      href="/feed">
        <IoIosArrowBack size={25}/>
      </Link>

      <h1 className="text-xl">
        Notifications
      </h1>
    </div>

  </div>

{/* ___________________________________________________________________________________________________________________ */}


    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black gap-2">

        <ComingSoon/>

    </div>
  </>

  );
}

export default Notifications;