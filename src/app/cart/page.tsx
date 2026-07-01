"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useCartStore } from "@/utils/store";
import { toast } from "react-toastify";

const CartPage = () => {
  const {
    products,
    totalItems,
    totalPrice,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart
  } = useCartStore();

  const handleOrder = async () => {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price: totalPrice + 2,
        products,
      }),
    });

    if (res.ok) {
      clearCart();
      toast.success("Order placed successfully!");
    } else {
      toast.error("Failed to place order");
    }
  };

  return (
    <section className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-9rem)] bg-zinc-950 py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-3 gap-8">
        {/* PRODUCTS */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-4xl font-black text-white mb-8">
            Your Cart
          </h1>

          {products.length === 0 ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center">
              <h2 className="text-2xl font-bold text-white">
                Your cart is empty 🛒
              </h2>

              <p className="text-zinc-400 mt-4">
                Add some delicious burgers to your cart.
              </p>
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.cartId}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6 hover:border-yellow-500 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative w-32 h-32 flex-shrink-0">
                  <Image
                    src={product.img!}
                    alt={product.title}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-white">
                    {product.title}
                  </h2>

                  {product.optionTitle &&
                    product.optionTitle.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {product.optionTitle.map((option, index) => (
                          <p
                            key={index}
                            className="text-zinc-400"
                          >
                            <span className="font-semibold text-white">
                              Size:
                            </span>{" "}
                            {option.title}
                          </p>
                        ))}
                      </div>
                    )}

                  <p className="mt-2 text-zinc-300">
                    <span className="font-semibold text-white">
                      Quantity:
                    </span>{" "}
                    {product.quantity}
                  </p>

                  <span className="block mt-4 text-3xl font-black text-yellow-500">
                    ${(product.price * product.quantity).toFixed(2)}
                  </span>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      decreaseQuantity(product.cartId)
                    }
                    className="w-10 h-10 rounded-full bg-zinc-800 text-white hover:bg-yellow-500 hover:text-black transition"
                  >
                    -
                  </button>

                  <span className="text-xl text-white font-bold">
                    {product.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(product.cartId)
                    }
                    className="w-10 h-10 rounded-full bg-zinc-800 text-white hover:bg-yellow-500 hover:text-black transition"
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() =>
                    removeFromCart(product.cartId)
                  }
                  className="text-red-500 hover:text-red-400 transition"
                >
                  <Trash2 size={22} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 h-fit sticky top-28">
          <h2 className="text-3xl font-bold text-white mb-8">
            Order Summary
          </h2>

          <div className="space-y-5 text-zinc-300">
            <div className="flex justify-between">
              <span>Subtotal ({totalItems})</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Service Fee</span>
              <span>$2.00</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="text-green-400 font-semibold">
                FREE
              </span>
            </div>

            <hr className="border-zinc-700" />

            <div className="flex justify-between text-2xl font-bold text-white">
              <span>Total</span>
              <span className="text-yellow-500">
                ${(totalPrice + 2).toFixed(2)}
              </span>
            </div>
          </div>

          <button
            onClick={handleOrder}
            className="w-full mt-8 rounded-2xl bg-yellow-500 py-4 text-lg font-bold text-black hover:bg-yellow-400 transition"
          >
            Confirm Order
          </button>

          <button className="w-full mt-4 border border-zinc-700 text-zinc-300 py-4 rounded-2xl hover:bg-zinc-800 transition">
            Continue Shopping
          </button>

          <div className="mt-8 rounded-2xl bg-zinc-800 p-4 text-center">
            <p className="text-zinc-400">
              🎉 <span className="text-white">Free delivery</span> on
              orders over{" "}
              <span className="text-yellow-500">$50</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;