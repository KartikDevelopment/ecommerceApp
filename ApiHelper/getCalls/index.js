import { GetClient } from "..";
export const getProducts = async () => {
  return GetClient("products");
};
