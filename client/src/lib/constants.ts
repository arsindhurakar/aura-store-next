export const SITE = {
  name: "NOIR",
  tagline: "Premium devices, considered.",
  description:
    "Premium mobile phones and accessories, designed without compromise. Free shipping on orders over $250.",
};

export const FREE_SHIPPING_THRESHOLD = 250;
export const SHIPPING_FEE = 15;

export const CATEGORY_LABELS: Record<string, string> = {
  phones: "Mobile Phones",
  audio: "Audio",
  wearables: "Wearables",
  accessories: "Accessories",
};

export const STATUS_LABEL: Record<string, string> = {
  in_stock: "In stock",
  low_stock: "Low stock",
  out_of_stock: "Out of stock",
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
