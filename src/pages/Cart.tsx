import styled from "styled-components";
import Title from "../components/common/Title";
import CartItem from "../components/cart/CartItem";
import { useCart } from "../hooks/useCart";
import { useMemo, useState } from "react";
import Empty from "../components/common/Empty";
import { FaShoppingBag } from "react-icons/fa";
import CartSummary from "../components/cart/CartSummary";
import Button from "../components/common/Button";
import { useAlert } from "../hooks/useAlert";
import { OrderSheet } from "../models/order.model";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { carts, deleteCartItem, isEmpty } = useCart();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const { showAlert, showConfirm } = useAlert();
  const navigate = useNavigate();

  const handleCheckItem = (id: number) => {
    // 이미 체크된 아이템이라면 체크 해제
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((item) => item !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  const handleItemDelete = (id: number) => {
    deleteCartItem(id);
  };

  const totalQuantity = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.id)) {
        return acc + cart.quantity;
      }
      return acc;
    }, 0);
  }, [carts, checkedItems]);

  const totalPrice = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.id)) {
        return acc + cart.price * cart.quantity;
      }

      return acc;
    }, 0);
  }, [carts, checkedItems]);

  const handleOrder = () => {
    if (totalQuantity === 0) {
      showAlert("주문할 상품을 선택해주세요.");
      return;
    }

    const orderData: Omit<OrderSheet, "delivery"> = {
      items: checkedItems,
      totalPrice,
      totalQuantity,
      firstBookTitle: carts[0].title,
    };
    showConfirm("주문하시겠습니까?", () => {
      navigate("/order", { state: orderData });
    });
  };

  return (
    <>
      <Title size="large">장바구니</Title>
      <CartStyle>
        {!isEmpty && (
          <>
            <div className="content">
              {carts.map((item) => (
                <CartItem
                  checkedItems={checkedItems}
                  key={item.id}
                  cart={item}
                  onCheck={handleCheckItem}
                  onDelete={handleItemDelete}
                />
              ))}
            </div>
          </>
        )}
        {isEmpty && (
          <div className="empty">
            <Empty
              title="장바구니가 비었습니다."
              icon={<FaShoppingBag />}
              description={<>장바구니에 상품을 추가해주세요.</>}
            />
          </div>
        )}
        <div className="summary">
          <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
          <Button size="large" schema="primary" onClick={handleOrder}>
            주문하기
          </Button>
        </div>
      </CartStyle>
    </>
  );
}
const CartStyle = styled.div`
  display: flex;
  gap: 24px;
  justify-content: space-between;
  padding: 24px 0 0 0;
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .summmary {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;

export default Cart;
