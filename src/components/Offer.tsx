import Image from "next/image";
import React from "react";
import CountDown from "./CountDown";

const Offer = () => {
  return (
    <section className="relative overflow-hidden bg-zinc-950 py-20">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/offerBg.png"
          alt=""
          fill
          className="object-cover opacity-10"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 items-center gap-16">
          {/* TEXT */}
          <div className="space-y-8 text-center lg:text-left">
            <span className="inline-block px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-500 uppercase tracking-[4px] text-sm font-semibold">
              🔥 Limited Time Offer
            </span>

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black text-white leading-tight">
              Double Boss Burger
            </h1>

            <p className="text-zinc-400 text-lg leading-8 max-w-xl">
              Enjoy our signature Double Boss Burger with crispy fries and a
              refreshing drink. Made with premium beef, melted cheddar cheese,
              fresh vegetables, and our special Boss sauce.
            </p>

            <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 w-fit mx-auto lg:mx-0">
              <CountDown />
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6">
              <div>
                <p className="text-zinc-500 line-through text-xl">$24.99</p>
                <h2 className="text-5xl font-black text-yellow-500">
                  $16.99
                </h2>
              </div>

              <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl shadow-yellow-500/20">
                Order Now
              </button>
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative flex justify-center">
            {/* Glow */}
            <div className="absolute w-[450px] h-[450px] rounded-full bg-yellow-500/20 blur-3xl" />

            <Image
              src="/offerProduct.png"
              alt="Boss Burger"
              width={600}
              height={600}
              className="relative object-contain hover:scale-105 transition duration-500 drop-shadow-[0_20px_60px_rgba(255,193,7,0.35)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offer;