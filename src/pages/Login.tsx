import React, { useState } from "react";
import Title from "../components/common/Title";
import styled from "styled-components";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login, signup } from "../api/auth.api";
import { useAlert } from "../hooks/useAlert";
import { SignupStyle } from "./Signup";
import { useAuthStore } from "../store/authStore";
export interface SignupProps {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const showAlert = useAlert();
  const { isLoogedIn, storeLogin, storeLogout } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();

  const onSubmit = (data: SignupProps) => {
    login(data)
      .then((res) => {
        const token = res.headers.authorization.split(" ")[1];
        // 상태변화
        storeLogin(token);
        showAlert("로그인 완료되었습니다");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        showAlert("로그인 실패했습니다");
      });
  };

  return (
    <>
      <Title size="large">로그인</Title>
      <SignupStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText {...register("email", { required: true })} inputType="email" placeholder="이메일" />
            {errors.email && <p className="error-text">이메일을 입력해주세요.</p>}
          </fieldset>
          <fieldset>
            <InputText
              {...register("password", { required: true })}
              autoComplete="off"
              inputType="password"
              placeholder="비밀번호"
            />
            {errors.email && <p className="error-text">비밀번호를 입력해주세요.</p>}
          </fieldset>
          <fieldset>
            <Button type="submit" size="medium" schema="primary">
              로그인
            </Button>
          </fieldset>
        </form>

        <div className="info">
          <Link to={"/reset"}>비밀번호 초기화</Link>
        </div>
      </SignupStyle>
    </>
  );
};

export default Login;
