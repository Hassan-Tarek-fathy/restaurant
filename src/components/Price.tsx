"use client";

import React, { useMemo, useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { ProductType } from "@/types/types";
import { useCartStore } from "@/utils/store";
import { toast } from "react-toastify";

type OptionType = {
  title: string;
  additionalPrice?: number;
};

const Price = ({ product }: { product: ProductType }) => {
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState<number>(-1);

  const { addTocart } = useCartStore();

  const selectedOption =
    selected >= 0 ? product.options?.[selected] : undefined;

  const additionalPrice = selectedOption?.additionalPrice ?? 0;

  const total = useMemo(() => {
    return quantity * (Number(product.price) + additionalPrice);
  }, [quantity, additionalPrice, product.price]);

  const handleAddToCart = () => {
    addTocart({
      cartId: `${product.id}-${selectedOption?.title ?? "default"}`,
      id: product.id,
      title: product.title,
      img: product.img,
      price: Number(product.price) + additionalPrice,
      quantity,
      optionTitle: selectedOption ? [selectedOption] : undefined,
    });

    toast.success("Added to cart");
  };

  return (
    <div className="space-y-5">
      {/* PRICE */}
      <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-[3px] text-black/70">
            Total Price
          </p>

          <h2 className="text-4xl font-black text-black">
            ${total.toFixed(2)}
          </h2>
        </div>

        <div className="text-right text-black">
          <p className="text-sm">Qty</p>
          <p className="text-3xl font-black">{quantity}</p>
        </div>
      </div>

      {/* SIZE */}
      {product.options && product.options.length > 0 && (
        <div className="flex items-center gap-3 flex-wrap">
          {product.options.map((option: OptionType, index) => (
            <button
              key={option.title}
              onClick={() => setSelected(index)}
              className={`rounded-xl px-5 py-2 font-semibold transition ${
                selected === index
                  ? "bg-yellow-500 text-black"
                  : "bg-zinc-800 text-white hover:bg-zinc-700"
              }`}
            >
              {option.title}

              {(option.additionalPrice ?? 0) > 0 && (
                <span className="ml-1 text-sm">
                  +${option.additionalPrice}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* QTY + CART */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center rounded-xl bg-zinc-900 border border-zinc-700">
          <button
            onClick={() =>
              setQuantity((prev) => Math.max(prev - 1, 1))
            }
            className="p-3 hover:bg-yellow-500 hover:text-black transition"
          >
            <Minus size={18} />
          </button>

          <span className="w-12 text-center font-bold text-xl">
            {quantity}
          </span>

          <button
            onClick={() =>
              setQuantity((prev) => Math.min(prev + 1, 20))
            }
            className="p-3 hover:bg-yellow-500 hover:text-black transition"
          >
            <Plus size={18} />
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 py-3 font-bold hover:scale-[1.02] transition"
        >
          <ShoppingCart size={20} />
          Add To Cart
        </button>
      </div>

      {/* SUMMARY */}
      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5">
        <div className="grid grid-cols-2 gap-y-3 text-sm">
          <span className="text-zinc-400">Base Price</span>
          <span className="text-right">
            ${Number(product.price).toFixed(2)}
          </span>

          {selectedOption && (
            <>
              <span className="text-zinc-400">Size</span>
              <span className="text-right">
                {selectedOption.title}
              </span>
            </>
          )}

          {additionalPrice > 0 && (
            <>
              <span className="text-zinc-400">Extra</span>
              <span className="text-right">
                +${additionalPrice.toFixed(2)}
              </span>
            </>
          )}

          <span className="text-zinc-400">Quantity</span>
          <span className="text-right">{quantity}</span>

          <div className="col-span-2 border-t border-zinc-700 pt-3 mt-2 flex justify-between text-lg font-bold text-yellow-400">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Price;