"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Star,
} from "lucide-react";
import { useRef } from "react";
import { ProductType } from "@/types/types";

type Props = {
  products: ProductType[];
};

const FeaturedSlider = ({ products }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -340,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 340,
      behavior: "smooth",
    });
  };

  const ProductCard = ({ item }: { item: ProductType }) => (
    <Link href={`/product/${item.id}`}>
      <div
        className="
          group
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-zinc-800
          bg-gradient-to-b
          from-zinc-900
          to-[#111]
          transition-all
          duration-500
          hover:-translate-y-2
          hover:border-yellow-500/60
          hover:shadow-[0_20px_50px_rgba(234,179,8,.12)]
          cursor-pointer
        "
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,.10),transparent_60%)] opacity-0 group-hover:opacity-100 transition" />

        {/* Badge */}
        <div className="absolute left-4 top-4 z-20 rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black">
          Best Seller
        </div>

        {/* IMAGE */}
        <div className="relative flex h-[190px] items-center justify-center overflow-hidden">
          <div className="absolute h-36 w-36 rounded-full bg-yellow-500/20 blur-3xl" />

          {item.img && (
            <Image
              src={item.img}
              alt={item.title}
              fill
              className="object-contain p-8 transition duration-500 group-hover:scale-110 group-hover:-rotate-2"
            />
          )}
        </div>

        {/* CONTENT */}
        <div className="flex min-h-[240px] flex-col justify-between p-5">
          <div>
            {/* Rating */}
            <div className="mb-2 flex items-center gap-1">
              <Star size={15} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-white">4.9</span>
              <span className="text-xs text-zinc-500">(210)</span>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-white">
              {item.title}
            </h2>

            {/* Desc */}
            <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
              {item.desc}
            </p>
          </div>

          {/* Bottom */}
          <div className="mt-4">
            <div className="mb-4 flex items-end justify-between">
              <span className="text-3xl font-extrabold text-yellow-400">
                ${item.price}
              </span>

              <span className="text-xs uppercase tracking-widest text-zinc-500">
                Premium
              </span>
            </div>

            {/* Button (UI فقط) */}
            <button
              onClick={(e) => e.preventDefault()}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-yellow-400
                to-yellow-500
                py-3
                font-bold
                text-black
                transition
                hover:scale-[1.03]
                hover:shadow-yellow-500/30
                active:scale-95
              "
            >
              <ShoppingBag size={18} />
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <section className="relative overflow-hidden bg-[#0d0d0d] py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,.08),transparent_55%)]" />

      {/* Heading */}
      <div className="relative z-10 mb-14 text-center">
        <h2 className="text-4xl font-black text-white">
          Signature Burgers
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-zinc-400">
          Premium burgers crafted with fresh ingredients and bold flavor.
        </p>
      </div>

      {/* Mobile */}
      <div className="relative md:hidden">
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur"
        >
          <ChevronRight size={20} />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth px-4 snap-x snap-mandatory"
        >
          {products.map((item) => (
            <div key={item.id} className="min-w-full snap-center">
              <ProductCard item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="mx-auto hidden max-w-[1600px] grid-cols-2 gap-6 px-6 md:grid lg:grid-cols-3 xl:grid-cols-4">
        {products.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedSlider;