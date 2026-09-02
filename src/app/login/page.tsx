import Link from "next/link";
import Form from "./components/form";


function LoginPage() {
  return (
      <div className="flex flex-col justify-center items-center min-h-screen from-white via-purple-400/40 to-white bg-gradient-to-bl dark:from-black dark:via-purple-700/20 dark:to-black p-4 backdrop-blur-3xl">
        <div className="md:shadow-lg md:border md:border-gray-200 md:dark:border-gray-700 rounded-xl p-8 w-full h-full  sm:w-100 md:backdrop-blur-3xl bg-transparent">

            <div className='flex items-center justify-center text-4xl font-playwrite mb-4 font-semibold'>
              Light
            </div>

            <div className="flex flex-col justify-center items-center">
              <h2 className="text-2xl mb-2">
                Welcome back!
              </h2>
            </div>

            <div className="flex flex-col justify-center items-center">
              <p className="text-md text-black/70 dark:text-white/70 mb-2 text-center font-extralight">
                Log in to your social world
              </p>
            </div>

            <Form/>

            <div className="mt-6 text-center">
              <p className="text-black/70 dark:text-white/70">
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-500 hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>

        </div>

      </div>
  );
}
export default LoginPage;