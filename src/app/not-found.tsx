import Link from "next/link";

function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      <div className="absolute left-[10%] top-[15%] h-16 w-16 rounded-full bg-purple-bg" />

      <div className="absolute right-[12%] top-[20%] h-10 w-10 rounded-full bg-blue-bg" />

      <div className="absolute bottom-[15%] left-[18%] h-8 w-8 rounded-full bg-yellow-bg" />

      <div className="absolute bottom-[20%] right-[15%] h-20 w-20 rounded-full bg-green-bg" />

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
        <div className="relative mb-8">
          <h1 className="relative text-[120px] font-extrabold leading-none tracking-tight text-primary sm:text-[150px]">
            404
          </h1>

          <div className="absolute -left-5 bottom-5 text-4xl text-yellow">
            ✦
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="mb-3 text-2xl font-bold text-text-primary sm:text-3xl">
            Oops! Page not found😶
          </h2>

          <p className="mx-auto max-w-md text-sm leading-6 text-text-secondary sm:text-base">
            The page you are looking for might have been moved, deleted, or
            never existed.
          </p>
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-primary-dark hover:shadow-md"
        >
          <span>←</span>
          Back to Home
        </Link>
      </section>
    </main>
  );
}

export default NotFound;
