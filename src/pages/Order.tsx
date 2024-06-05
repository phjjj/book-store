import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Title from "../components/common/Title";
import { CartStyle } from "./Cart";
import CartSummary from "../components/cart/CartSummary";
import Button from "../components/common/Button";
import InputText from "../components/common/InputText";
import { useForm } from "react-hook-form";
import { Delivery, OrderSheet } from "../models/order.model";
import FindAddress from "../components/common/order/FindAddress";
import { order } from "../api/order.api";
import { useAlert } from "../hooks/useAlert";

interface DeliveryFrom extends Delivery {
  addressDetail: string;
}

function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDataFromCart = location.state;
  const { totalQuantity, totalPrice, firstBookTitle } = orderDataFromCart;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<DeliveryFrom>();
  const { showAlert, showConfirm } = useAlert();

  const handlePay = (data: DeliveryFrom) => {
    const orderData: OrderSheet = {
      ...orderDataFromCart,
      delivery: {
        ...data,
        address: `${data.address} ${data.addressDetail}`,
      },
    };

    showConfirm("주문하시겠습니까?", () => {
      order(orderData).then(() => {
        showAlert("주문이 완료되었습니다.");
        navigate("/orderlist");
      });
    });
  };

  return (
    <>
      <Title size="large">주문서작성</Title>
      <CartStyle>
        <div className="content">
          <div className="order-info">
            <Title color="text" size="medium">
              배송 정보
            </Title>
            <form className="delivery">
              <fieldset>
                <label>주소</label>
                <div className="input">
                  <InputText {...register("address", { required: true })} inputType="text" />
                </div>
                <FindAddress onCompleted={(address) => setValue("address", address)} />
              </fieldset>
              {errors.address && <p className="error-text">주소를 입력해주세요.</p>}

              <fieldset>
                <label>상세주소</label>
                <div className="input">
                  <InputText {...register("addressDetail", { required: true })} inputType="text" />
                </div>
              </fieldset>
              {errors.address && <p className="error-text">상세주소를 입력해주세요.</p>}

              <fieldset>
                <label>수령인</label>
                <div className="input">
                  <InputText {...register("receiver", { required: true })} inputType="text" />
                </div>
              </fieldset>
              {errors.address && <p className="error-text">수령인을 입력해주세요.</p>}

              <fieldset>
                <label>전화번호</label>
                <div className="input">
                  <InputText {...register("contact", { required: true })} inputType="text" />
                </div>
              </fieldset>
              {errors.address && <p className="error-text">전화번호를 입력해주세요.</p>}
            </form>

            <Title color="text" size="medium">
              주문 정보
            </Title>
            <strong>
              {firstBookTitle} 외 총 {totalQuantity}권
            </strong>
          </div>
        </div>
        <div className="summary">
          <CartSummary totalPrice={totalPrice} totalQuantity={totalQuantity} />
          <Button onClick={handleSubmit(handlePay)} size="large" schema="primary">
            결제하기
          </Button>
        </div>
      </CartStyle>
    </>
  );
}
const OrderStyle = styled.div``;

export default Order;
