function Loading() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      <div className="absolute left-[12%] top-[18%] h-14 w-14 rounded-full bg-purple-bg" />
      <div className="absolute right-[15%] top-[22%] h-10 w-10 rounded-full bg-blue-bg" />
      <div className="absolute bottom-[18%] left-[20%] h-8 w-8 rounded-full bg-yellow-bg" />
      <div className="absolute bottom-[20%] right-[18%] h-16 w-16 rounded-full bg-green-bg" />

      <div className="absolute left-[24%] top-[32%] text-2xl text-yellow">
        ✦
      </div>

      <div className="absolute right-[25%] top-[30%] text-xl text-purple">
        ✦
      </div>

      <div className="absolute bottom-[28%] right-[30%] text-lg text-red">
        ✦
      </div>

      <section className="relative z-10 flex flex-col items-center text-center">
        <div className="relative mb-7 h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-primary-light" />

          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary" />
        </div>

        <h1 className="mb-2 text-2xl font-bold text-text-primary">
          Loading...
        </h1>

        <p className="text-sm text-text-secondary">
          Please wait while we prepare your page.
        </p>
      </section>
    </main>
  );
}

export default Loading;
