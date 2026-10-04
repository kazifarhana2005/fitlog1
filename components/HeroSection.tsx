export default function HeroSection() {
  return (
    <section className="mx-auto mt-8 w-[92%] max-w-[1280px] rounded-2xl bg-[#222630] px-8 py-10 md:px-12 md:py-12">
      <div className="flex min-h-[280px] items-center justify-between gap-8">

        {/* LEFT SIDE */}
        <div className="flex-1">
          <p className="mb-3 text-sm font-bold tracking-wider text-[#C2F800]">
            WORKOUT LIBRARY
          </p>

          <h1 className="text-4xl font-extrabold leading-[0.95] text-white md:text-5xl lg:text-6xl">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="mt-5 max-w-[570px] text-sm leading-6 text-white/90 md:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <button
            className="mt-6 rounded-md bg-[#C2F800] px-5 py-3 text-xs font-bold uppercase text-black transition hover:opacity-90"
          >
            Browse Workouts
            <span className="ml-3">→</span>
          </button>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="hidden shrink-0 items-center justify-center md:flex">
          <img
            src="/assets/banner.png"
            alt="Workout"
            className="h-[220px] w-[220px] object-contain lg:h-[290px] lg:w-[280px]"
          />
        </div>

      </div>
    </section>
  );
}