import { Cart } from "../models/cart.model";
import { httpclient } from "./http";

interface AddCartParams {
  book_id: number;
  quantity: number;
}

export const addCart = async (params: AddCartParams) => {
  const response = await httpclient.post("/carts", params);

  return response.data;
};

export const fetchCart = async () => {
  const response = await httpclient.get<Cart[]>("/carts");

  return response.data;
};

export const deleteCart = async (cartId: number) => {
  const response = await httpclient.delete(`/carts/${cartId}`);

  return response.data;
};
