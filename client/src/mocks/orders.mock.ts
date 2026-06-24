import type { Order } from "@/types/order.types";
import heroPhone from "@/assets/images/jpg/hero-phone.jpg";
import pBuds from "@/assets/images/jpg/p-buds.jpg";
import pWatch from "@/assets/images/jpg/p-watch.jpg";
import pCharger from "@/assets/images/jpg/p-charger.jpg";
import catAudio from "@/assets/images/jpg/cat-audio.jpg";

export const ordersMock: Order[] = [
  {
    id: "o_001",
    reference: "NOIR-2026-0814",
    items: [
      {
        productId: "p_01",
        name: "Aether Pro 15",
        image: heroPhone,
        unitPrice: 1149,
        quantity: 1,
      },
      {
        productId: "p_05",
        name: "Pulse Air Buds",
        image: pBuds,
        unitPrice: 229,
        quantity: 1,
      },
    ],
    subtotal: 1378,
    shipping: 0,
    total: 1378,
    status: "processing",
    customer: {
      fullName: "Daniel Ortega",
      phone: "+1 415 555 0142",
      email: "d.ortega@example.com",
      address: "548 Valencia St, San Francisco, CA 94110",
      notes: "Leave at concierge.",
    },
    createdAt: "2026-06-21T14:22:00Z",
  },
  {
    id: "o_002",
    reference: "NOIR-2026-0813",
    items: [
      {
        productId: "p_06",
        name: "Helix Watch GT",
        image: pWatch,
        unitPrice: 429,
        quantity: 1,
      },
    ],
    subtotal: 429,
    shipping: 0,
    total: 429,
    status: "shipped",
    customer: {
      fullName: "Amelia Chen",
      phone: "+44 20 7946 0218",
      address: "12 Lamb's Conduit St, London WC1N 3LD",
    },
    createdAt: "2026-06-20T09:11:00Z",
  },
  {
    id: "o_003",
    reference: "NOIR-2026-0812",
    items: [
      {
        productId: "p_04",
        name: "Pulse Studio Headphones",
        image: catAudio,
        unitPrice: 379,
        quantity: 2,
      },
    ],
    subtotal: 758,
    shipping: 15,
    total: 773,
    status: "delivered",
    customer: {
      fullName: "Rafael Bianchi",
      phone: "+39 02 555 0193",
      email: "r.bianchi@example.com",
      address: "Via della Spiga 26, 20121 Milano",
    },
    createdAt: "2026-06-18T16:40:00Z",
  },
  {
    id: "o_004",
    reference: "NOIR-2026-0811",
    items: [
      {
        productId: "p_08",
        name: "Magcore Wireless Dock",
        image: pCharger,
        unitPrice: 99,
        quantity: 1,
      },
    ],
    subtotal: 99,
    shipping: 9,
    total: 108,
    status: "pending",
    customer: {
      fullName: "Yuki Tanaka",
      phone: "+81 3 5555 0166",
      address: "2-11-3 Meguro, Tokyo 153-0063",
    },
    createdAt: "2026-06-22T08:02:00Z",
  },
];
