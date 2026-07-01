"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "./CartIcon";

const links = [
  { id: 1, title: "Homepage", url: "/" },
  { id: 2, title: "Menu", url: "/menu" },
  { id: 3, title: "Working Hours", url: "/" },
  { id: 4, title: "Contact", url: "/" },
];

const Menu = () => {
  const [open, setOpen] = useState(false);

  const user = false;

  return (
    <div>
      {/* Menu Button */}
      <Image
        src={open ? "/close.png" : "/open.png"}
        alt="Menu"
        width={24}
        height={24}
        onClick={() => setOpen(!open)}
        className="cursor-pointer"
      />

      {open && (
        <div className="absolute left-0 top-24 z-50 flex h-[calc(100vh-6rem)] w-full flex-col items-center justify-center gap-8 bg-zinc-950 text-white text-3xl">
          {links.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              onClick={() => setOpen(false)}
              className="hover:text-yellow-500 transition"
            >
              {item.title}
            </Link>
          ))}

          <Link
            href={user ? "/orders" : "/login"}
            onClick={() => setOpen(false)}
            className="hover:text-yellow-500 transition"
          >
            {user ? "Orders" : "Login"}
          </Link>

          {/* DON'T wrap CartIcon with Link if CartIcon already has one */}
          <div onClick={() => setOpen(false)}>
            <CartIcon />
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;