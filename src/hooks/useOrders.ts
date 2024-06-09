import { useEffect, useState } from "react";
import { Order, OrderListItem } from "../models/order.model";
import { fetchOrder, fetchOrders } from "../api/order.api";

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  useEffect(() => {
    fetchOrders().then((orders) => {
      console.log(orders);
      setOrders(orders);
    });
  }, []);

  const selectedOrderItem = (orderId: number) => {
    // 자세히를 여러번 누를 경우 계속 fetch를 하게 되므로
    // 이미 있는 데이터는 그대로 두고 새로운 데이터만 추가
    if (orders.filter((item) => item.id === orderId)[0].detail) {
      setSelectedItemId(orderId);
      return;
    }

    fetchOrder(orderId).then((orderDetail) => {
      setSelectedItemId(orderId);
      setOrders(
        orders.map((item) => {
          if (item.id === orderId) {
            return {
              ...item,
              detail: orderDetail,
            };
          }
          return item;
        })
      );
    });
  };

  return { orders, selectedItemId, selectedOrderItem };
};
