import Banner from "@/components/banner/Banner";
import Image from "next/image";
import { ListProductCategory } from "./_components/ListProductCategory";
import { ProductBestseller } from "./_components/ProductBestseller";
import { OurCategories } from "./_components/OurCategories";
import { ProductNewArrivals } from "./_components/ProductNewArrivals";

export default function Home() {
  return (
    <div>
      <Banner />
      <ListProductCategory/>
      <ProductBestseller />
      <OurCategories />
      <ProductNewArrivals />
    </div>
  );
}
