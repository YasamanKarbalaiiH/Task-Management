"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      <div className="absolute left-[10%] top-[15%] h-16 w-16 rounded-full bg-red-bg" />
      <div className="absolute right-[12%] top-[20%] h-10 w-10 rounded-full bg-purple-bg" />
      <div className="absolute bottom-[15%] left-[18%] h-8 w-8 rounded-full bg-yellow-bg" />
      <div className="absolute bottom-[20%] right-[15%] h-20 w-20 rounded-full bg-blue-bg" />

      <div className="absolute left-[22%] top-[30%] text-2xl text-yellow">
        ✦
      </div>

      <div className="absolute right-[25%] top-[35%] text-xl text-purple">
        ✦
      </div>

      <div className="absolute bottom-[30%] right-[30%] text-lg text-red">
        ✦
      </div>

      <section className="relative z-10 flex max-w-lg flex-col items-center text-center">
        <div className="mb-7 flex h-20 w-20 items-center justify-center rounded-full bg-red-bg">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red text-2xl font-bold text-white">
            !
          </div>
        </div>

        <h1 className="mb-3 text-2xl font-bold text-text-primary sm:text-3xl">
          Something went wrong
        </h1>

        <p className="max-w-md text-sm leading-6 text-text-secondary sm:text-base">
          We could not load this page. Please try again or return to the home
          page.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => reset()}
            className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-primary-dark hover:shadow-md"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="rounded-lg border border-border bg-white px-6 py-3 text-sm font-medium text-text-primary transition-all duration-200 hover:bg-primary-light"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
