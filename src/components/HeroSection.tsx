export default function HeroSection() {
  return (
    <section className="relative h-96 w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white/25 dark:from-gray-900 dark:to-gray-900/75"></div>
      <div className="relative z-10 flex h-full items-center justify-center text-center px-6 sm:px-8 lg:px-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 drop-shadow-lg">
          Discover Your Perfect Stay
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Find exceptional hotels around the world with amazing deals and
          unmatched hospitality.
        </p>
      </div>
    </section>
  );
}