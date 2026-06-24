import { Category } from "@/features/categories/types";

import heroPhone from "@/assets/images/jpg/hero-phone.jpg";
import catAudio from "@/assets/images/jpg/cat-audio.jpg";
import catWearables from "@/assets/images/jpg/cat-wearables.jpg";
import pCharger from "@/assets/images/jpg/p-charger.jpg";

export const categories: Category[] = [
  {
    id: "phones",
    name: "Mobile Phones",
    description: "Flagship and pro devices.",
    image: heroPhone,
  },
  {
    id: "audio",
    name: "Audio",
    description: "Headphones, earbuds & sound.",
    image: catAudio,
  },
  {
    id: "wearables",
    name: "Wearables",
    description: "Smartwatches & bands.",
    image: catWearables,
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Cases, chargers, cables.",
    image: pCharger,
  },
];
