import { categories } from "@/mocks/categories.mock";

const wait = (ms = 250) => new Promise((r) => setTimeout(r, ms));

export const categoryApi = {
  async categories() {
    await wait();

    return categories;
  },
};
