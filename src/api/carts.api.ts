import { httpclient } from "./http";

interface AddCartParams {
  book_id: number;
  quantity: number;
}

export const addCart = async (params: AddCartParams) => {
  const response = await httpclient.post("/carts", params);

  return response.data;
};
