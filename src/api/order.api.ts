import { Order, OrderDetailItem, OrderSheet } from "../models/order.model";
import { httpclient } from "./http";

export const order = async (orderData: OrderSheet) => {
  const response = await httpclient.post("/orders", orderData);
  return response.data;
};

export const fetchOrders = async () => {
  const response = await httpclient.get<Order[]>("/orders");
  return response.data;
};

export const fetchOrder = async (id: number) => {
  const response = await httpclient.get<OrderDetailItem[]>(`/orders/${id}`);
  return response.data;
};
