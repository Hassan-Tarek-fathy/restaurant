import FeaturedSlider from "./FeaturedSlider";
import { ProductType } from "@/types/types";

const getData = async () => {
  const res = await fetch(`/api/product`, {
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