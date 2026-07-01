import Link from "next/link";
import React from "react";
import {
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

import { MapPin, Phone, Mail } from "lucide-react";
const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 grid md:grid-cols-3 gap-10">
        {/* Logo */}
        <div>
          <Link href="/" className="text-4xl font-black text-white">
            BOSS
          </Link>

          <p className="text-yellow-500 tracking-[5px] uppercase text-sm">
            Burger
          </p>

          <p className="mt-5 text-zinc-400 leading-7">
            Fresh ingredients, premium burgers, crispy fries, and unforgettable
            flavor served every day.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-bold text-xl mb-5">
            Contact Us
          </h3>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-yellow-500" />
              <span>ُEgypt</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} className="text-yellow-500" />
              <span>01028936921</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={18} className="text-yellow-500" />
              <span>hassantarekfathy@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-bold text-xl mb-5">
            Follow Us
          </h3>

          <div className="flex gap-5">
            <Link
              href="https://www.linkedin.com/in/hassan-tarek-a63636240"
              className="w-11 h-11 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition"
            >
              <FaLinkedinIn size={20} />
            </Link>

            <Link
              href="https://github.com/Hassan-Tarek-fathy"
              className="w-11 h-11 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition"
            >
              <FaGithub size={20} />
            </Link>

            <Link
              href="#"
              className="w-11 h-11 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition"
            >
              <FaXTwitter size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-zinc-800 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-zinc-500 text-sm">
          <p>© {new Date().getFullYear()} Boss Burger. All Rights Reserved.</p>

          <div className="flex gap-6">
            <Link href="#" className="hover:text-yellow-500 transition">
              Privacy Policy
            </Link>

            <Link href="#" className="hover:text-yellow-500 transition">
              {"<HT>"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;