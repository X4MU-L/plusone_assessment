import { Link } from "react-router-dom";

import AnimationWrapper from "./utils";

import SignUpForm from "../components/forms/signup-form";

function signup() {
  return (
    <section className="bg-[url('/image/image-4.jpeg')]">
      <AnimationWrapper show={true}>
        <div className="backdrop-blur-sm bg-gray-900/20">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <Link
              to="/"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              Plusone Blog
            </Link>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
                </h1>
                <SignUpForm />
              </div>
            </div>
          </div>
        </div>
      </AnimationWrapper>
    </section>
  );
}

export default signup;
