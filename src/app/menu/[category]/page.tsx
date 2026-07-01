import { ProductType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import MobileCarousel from "@/components/MobileCarousel";

const getData = async (category: string) => {
  const res = await fetch(
    `/api/product?cat=${category}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

type Props = {
  params: Promise<{
    category: string;
  }>;
};

const CategoryPage = async ({ params }: Props) => {
  const { category } = await params;
  const products: ProductType[] = await getData(category);

  return (
    <section className="min-h-screen bg-[#0d0d0d] py-14 px-4 sm:px-6 lg:px-20 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,.08),transparent_55%)]" />

      {/* Header */}
      <div className="relative z-10 text-center mb-12 sm:mb-16">
        <p className="text-yellow-500 uppercase tracking-[5px] text-xs sm:text-sm">
          Boss Burger
        </p>

        <h1 className="mt-2 sm:mt-3 text-3xl sm:text-5xl font-black text-white">
          Our Menu
        </h1>

        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
          Discover our handcrafted burgers, crispy fries, and signature meals
          made with premium ingredients.
        </p>
      </div>

      {/* 📱 MOBILE (Carousel with arrows) */}
      <MobileCarousel products={products} />

      {/* 💻 DESKTOP GRID */}
      <div className="relative z-10 hidden sm:grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((item) => (
          <Link key={item.id} href={`/product/${item.id}`}>
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
              "
            >
              {/* IMAGE */}
              <div className="relative h-72 flex items-center justify-center overflow-hidden">
                <div className="absolute h-40 w-40 rounded-full bg-yellow-500/20 blur-3xl" />

                {item.img && (
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-contain p-8 transition duration-500 group-hover:scale-110"
                  />
                )}
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white">
                  {item.title}
                </h2>

                <p className="mt-3 text-zinc-400 line-clamp-2">
                  {item.desc}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-3xl font-black text-yellow-400">
                    ${item.price}
                  </span>

                  <span className="rounded-xl bg-yellow-500 px-5 py-3 font-bold text-black">
                    View Details
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryPage;