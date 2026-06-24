import { brands } from "@/mocks/products.mock";

const wait = (ms = 250) => new Promise((r) => setTimeout(r, ms));

export const brandApi = {
  async brands() {
    await wait();

    return brands;
  },
};
