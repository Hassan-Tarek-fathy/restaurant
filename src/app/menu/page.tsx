import { MenuType } from "@/types/types";
import Link from "next/link";
 const getData = async () => {
  const baseUrl =
    process.env.NEXTAUTH_URL ||
    process.env.NEXT_PUBLIC_URL ||
    "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
const MenuPage =  async () => {
  const menu:MenuType = await getData();
  return (
    <section className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-9rem)] bg-zinc-950">
      <div className="grid md:grid-cols-2 xl:grid-cols-3">
        {menu.map((category) => (
          <Link
            key={category.id}
            href={`/menu/${category.slug}`}
            className="group relative h-[350px] overflow-hidden"
          >
            {/* Background */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage: `url(${category.img})`,
              }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-500" />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col justify-end p-8">
              <span className="text-yellow-500 uppercase tracking-[4px] text-sm">
                Boss Burger
              </span>

              <h2 className="mt-2 text-4xl font-black text-white">
                {category.title}
              </h2>

              <p className="mt-4 text-zinc-300 leading-7">
                {category.desc}
              </p>

              <button className="mt-8 w-fit rounded-full bg-yellow-500 px-6 py-3 font-semibold text-black transition-all duration-300 hover:bg-yellow-400 hover:scale-105">
                Explore Menu →
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MenuPage;