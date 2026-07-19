import { StaticImageData } from "next/image";

import type { ProductCategory } from "@/types/shared.types";

export interface Category {
  id: ProductCategory;
  name: string;
  description: string;
  image: StaticImageData;
}
