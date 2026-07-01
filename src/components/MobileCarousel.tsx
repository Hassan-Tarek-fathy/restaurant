"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductType } from "@/types/types";

type Props = {
  products: ProductType[];
};

const MobileCarousel = ({ products }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    ref.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    ref.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative sm:hidden mb-10">
      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 z-20 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full backdrop-blur"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 z-20 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full backdrop-blur"
      >
        <ChevronRight size={20} />
      </button>

      {/* Scroll */}
      <div
        ref={ref}
        className="flex gap-4 overflow-x-hidden scroll-smooth px-4"
      >
        {products.map((item) => (
          <Link
            key={item.id}
            href={`/product/${item.id}`}
            className="
              min-w-[85%]
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-zinc-800
              bg-gradient-to-b
              from-zinc-900
              to-[#111]
            "
          >
            {/* IMAGE */}
            <div className="relative h-52 flex items-center justify-center">
              <div className="absolute h-32 w-32 rounded-full bg-yellow-500/20 blur-3xl" />

              {item.img && (
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-contain p-6"
                />
              )}
            </div>

            {/* CONTENT */}
            <div className="p-4">
              <h2 className="text-lg font-bold text-white">
                {item.title}
              </h2>

              <p className="mt-2 text-sm text-zinc-400 line-clamp-2">
                {item.desc}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-yellow-400">
                  ${item.price}
                </span>

                <span className="rounded-lg bg-yellow-500 px-3 py-2 text-xs font-bold text-black">
                  View
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileCarousel;