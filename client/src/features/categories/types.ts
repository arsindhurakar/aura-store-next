import { ProductCategory } from "@/types";
import { StaticImageData } from "next/image";

export interface Category {
  id: ProductCategory;
  name: string;
  description: string;
  image: StaticImageData;
}
