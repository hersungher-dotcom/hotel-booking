export default function HeroSection() {
  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80')] bg-center bg-cover"
      ></div>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6 sm:px-8 lg:px-12">
        <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Discover Your Perfect Stay
        </h1>
        <p className="text-xl text-white/90 mb-6 max-w-2xl">
          Find exceptional hotels around the world with amazing deals and unmatched hospitality.
        </p>
        <button
          className="px-6 py-3 bg-white/20 text-white rounded-md hover:bg-white/30 transition-colors hover:shadow-lg"
        >
          Explore Hotels
        </button>
      </div>
    </section>
  );
}