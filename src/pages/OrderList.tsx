import styled from "styled-components";
import Title from "../components/common/Title";
import { useOrders } from "../hooks/useOrders";
import { formatDate, formatNumber } from "../utils/format";
import Button from "../components/common/Button";
import React from "react";

function OrderList() {
  const { orders, selectedOrderItem, selectedItemId } = useOrders();
  console.log(orders);
  return (
    <>
      <Title size="large">주문내역</Title>
      <OrderListStyle>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>주문일자</th>
              <th>주소</th>
              <th>수량인</th>
              <th>전화번호</th>
              <th>대표상품명</th>
              <th>수량</th>
              <th>금액</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{formatDate(order.createdAt, "YYYY.MM.DD")}</td>
                  <td>{order.address}</td>
                  <td>{order.recevier}</td>
                  <td>{order.contact}</td>
                  <td>{order.book_title}</td>
                  <td>{order.total_quantity} 권</td>
                  <td>{formatNumber(order.total_price)}</td>
                  <td>
                    <Button onClick={() => selectedOrderItem(order.id)} size="small" schema="normal">
                      자세히
                    </Button>
                  </td>
                </tr>
                {selectedItemId === order.id && (
                  <tr>
                    <td></td>
                    <td colSpan={8}>
                      <ul className="detail">
                        {order?.detail &&
                          order.detail.map((item) => (
                            <li key={item.book_id}>
                              <div>
                                <span>{item.book_id}</span>
                                <span>{item.author}</span>
                                <span>{item.quantity}</span>
                                <span>{formatNumber(item.price)} 원</span>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </OrderListStyle>
    </>
  );
}
const OrderListStyle = styled.div`
  padding: 24px 0 0 0;
  table {
    width: 100%;
    border-collapse: collapse;
    border-top: ${({ theme }) => theme.color.border};
    th,
    td {
      padding: 16px;
      border-bottom: 1px solid ${({ theme }) => theme.color.border};
      text-align: center;
    }
    .detail {
      margin: 0;
      li {
        list-style: square;
        text-align: left;
        div {
          display: flex;
          padding: 8px 12px;
          gap: 8px;
        }
      }
    }
  }
`;

export default OrderList;
