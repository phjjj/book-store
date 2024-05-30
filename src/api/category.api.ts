import { Category } from "../models/category.model";
import { httpclient } from "./http";

export const fetchCategory = async () => {
  const response = await httpclient.get<Category[]>(`/category`);
  return response.data;
};
