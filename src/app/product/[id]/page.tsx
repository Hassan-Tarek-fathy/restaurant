import Price from "@/components/Price";
import DeleteButton from "@/components/DeleteButton";
import Image from "next/image";
import { Flame, Star, Truck } from "lucide-react";
import { ProductType } from "@/types/types";

const getData = async (id: string) => {
  const res = await fetch(`/api/product/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
};

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const product: ProductType = await getData(id);

  return (
   <section className="min-h-[calc(100vh-6rem)] bg-zinc-950 text-white py-8 px-6 lg:px-16">
    <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      {/* LEFT SIDE */}
      <div className="flex flex-col">
        <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
              <Truck className="text-green-400" size={22} />
              <div>
                <p className="font-semibold text-sm">
                  Fast Delivery
                </p>
                <p className="text-xs text-zinc-500">
                  20-30 Minutes
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
              <Flame className="text-red-500" size={22} />
              <div>
                <p className="font-semibold text-sm">
                  Fresh & Hot
                </p>
                <p className="text-xs text-zinc-500">
                  Always Delicious
                </p>
              </div>
            </div>
          </div>
        {product.img && (
          <div className="mt-6 relative flex items-center justify-center h-[320px] lg:h-[380px] rounded-3xl bg-zinc-900 border border-zinc-800 overflow-hidden">
            <Image
              src={product.img}
              alt={product.title}
              fill
              priority
              className="object-contain p-6 hover:scale-105 transition duration-500"
            />
          </div>
        )} 

        {/* Product Info */}
        <div className="mt-6  flex items-center gap-4 flex-wrap">
         
          <h1 className="mt-4 text-4xl lg:text-5xl font-black">
            {product.title}
          </h1>

          <p className="mt-4 text-zinc-400 leading-7">
            {product.desc}
          </p>

          {/* Features */}
          
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="space-y-5 sticky top-24">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
          <Price product={product} />
        </div>

        <div className="flex justify-end">
          <DeleteButton id={product.id} />
        </div>
      </div>
    </div>
  </section>
  );
};

export default SingleProductPage;