
import FeaturedSlider from "./FeaturedSlider";
import { ProductType } from "@/types/types";

const getData = async () => {
  const baseUrl =
    process.env.NEXTAUTH_URL ||
    process.env.NEXT_PUBLIC_URL ||
    "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/product`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const Featured = async () => {
  const featuredProducts: ProductType[] = await getData();

  return <FeaturedSlider products={featuredProducts} />;
};

export default Featured;