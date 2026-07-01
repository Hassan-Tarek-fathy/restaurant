import React from "react";
import { Truck, Flame } from "lucide-react";

const Notification = () => {
  return (
    <div className="h-12 bg-black border-b border-yellow-500/20 text-yellow-400 flex items-center justify-center gap-3 px-4 text-sm md:text-base font-medium overflow-hidden">
      <Flame size={18} className="text-yellow-500 animate-pulse" />

      <span>
        🍔 Free delivery on all orders over{" "}
        <span className="font-bold text-white">$50</span>. Order now and enjoy
        the Boss Burger experience!
      </span>

      <Truck size={18} className="text-yellow-500" />
    </div>
  );
};

export default Notification;