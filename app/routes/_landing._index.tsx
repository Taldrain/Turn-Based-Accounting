import type { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from '@remix-run/react';

import{ getUserId } from '~/utils/session.server';
import landing from "~/images/landing.png";

export const loader = async({ request }: LoaderArgs) => {
  const userId = await getUserId(request);

  return ({
    isLoggedIn: userId !== null,
  });
}

export default function Landing() {
  const { isLoggedIn } = useLoaderData<typeof loader>();

  return (
    <div className="bg-white h-screen flex flex-col">
      <main className="grow">
        {/* Hero section */}
        <div className="overflow-hidden pt-8 sm:pt-12 lg:relative lg:py-48">
          <div className="mx-auto max-w-md px-6 sm:max-w-3xl lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-24 lg:px-8">
            <div>
              <div className="mt-20">
                <div className="mt-6 sm:max-w-xl">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Turn-Based Accounting
                  </h1>
                  <p className="mt-6 text-xl text-gray-500">
                    Display your budget like a turn-based game.
                  </p>
                </div>
                <div className="flex flex-row-reverse mt-12">
                  <Link
                    to="/dashboard/"
                    className="rounded-md border border-transparent inline-flex bg-orange-500 px-5 py-3 text-base font-medium text-white shadow hover:bg-orange-600 sm:px-10"
                  >
                    { isLoggedIn ? "Go to dashboard" : "Sign-in" }
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
            <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <div className="hidden sm:block">
                <div className="absolute inset-y-0 left-1/2 w-screen rounded-l-3xl bg-gray-50 lg:left-80 lg:right-0 lg:w-full" />
                <svg
                  className="absolute top-8 right-1/2 -mr-3 lg:left-0 lg:m-0"
                  width={404}
                  height={392}
                  fill="none"
                  viewBox="0 0 404 392"
                >
                  <defs>
                    <pattern
                      id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width={404} height={392} fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
                </svg>
              </div>
              <div className="relative -mr-40 pl-6 sm:mx-auto sm:max-w-3xl sm:px-0 lg:h-full lg:max-w-none lg:pl-12">
                <img
                  className="w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
                  src={landing}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-20">
          <div className="mx-auto max-w-md px-6 sm:max-w-3xl lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-24 lg:px-8">
            <p>
              Check the code on <a href="https://github.com/Taldrain/Turn-Based-Accounting" target="_blank" rel="noreferrer" className="text-base font-medium hover:text-orange-600">GitHub</a>
            </p>
          </div>
        </div>
      </main>

      <footer className="mt-24 bg-gray-900 sm:mt-12">
        <div className="mx-auto max-w-md overflow-hidden py-12 px-6 sm:max-w-3xl lg:max-w-7xl lg:px-8">
          <p className="text-center text-base text-gray-400">
            tba.taldra.in
          </p>
          <div className="mt-2 flex justify-center space-x-6">
            🙇
          </div>
        </div>
      </footer>
    </div>
  );
}
