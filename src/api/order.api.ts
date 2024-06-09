import { Order, OrderDetailItem, OrderSheet } from "../models/order.model";
import { httpclient, requestHandler } from "./http";

// export const order = async (orderData: OrderSheet) => {
//   const response = await httpclient.post("/orders", orderData);
//   return response.data;
// };

export const order = async (orderData: OrderSheet) => {
  return await requestHandler<OrderSheet>("post", "/orders", orderData);
};

export const fetchOrders = async () => {
  return await requestHandler<Order[]>("get", "/orders");
};

export const fetchOrder = async (id: number) => {
  return await requestHandler<OrderDetailItem[]>("get", `/orders/${id}`);
};
