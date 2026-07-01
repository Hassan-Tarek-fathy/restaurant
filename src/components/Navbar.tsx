"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

import Menu from "./Menu";
import CartIcon from "./CartIcon";
import UserLinks from "./UserLinks";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-lg border-b border-zinc-800">
      <nav className="h-20 lg:h-24 max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
        {/* LEFT */}
        <div className="hidden md:flex items-center gap-8 flex-1">
          <Link
            href="/"
            className="text-zinc-300 hover:text-yellow-500 transition font-medium"
          >
            Home
          </Link>

          <Link
            href="/menu"
            className="text-zinc-300 hover:text-yellow-500 transition font-medium"
          >
            Menu
          </Link>

          <Link
            href="/contact"
            className="text-zinc-300 hover:text-yellow-500 transition font-medium"
          >
            Contact
          </Link>

          {session?.user?.isAdmin && (
            <Link
              href="/add"
              className="rounded-full bg-yellow-500 px-4 py-2 text-sm font-bold text-black hover:bg-yellow-400 transition"
            >
              Add Product
            </Link>
          )}
        
        
        </div>

        {/* LOGO */}
        <div className="flex-1 flex justify-center">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/temporary/p9.png"
              alt="Boss Burger"
              width={55}
              height={55}
              className="group-hover:rotate-12 transition duration-300"
            />

            <div className="leading-none">
              <h1 className="text-3xl font-black text-white tracking-wide">
                BOSS
              </h1>

              <span className="text-yellow-500 uppercase text-sm tracking-[4px]">
                Burger
              </span>
            </div>
          </Link>
        </div>

        {/* MOBILE MENU */}
        <div className="md:hidden">
          <Menu />
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex items-center justify-end gap-6 flex-1">
          <div className="md:hidden flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold">
            <Image
              src="/phone.png"
              alt="Phone"
              width={10}
              height={10}
            />
            <span>+20 123 456 789</span>
          </div>

          <UserLinks />

          <div className="text-white hover:text-yellow-500 transition">
            <CartIcon />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;