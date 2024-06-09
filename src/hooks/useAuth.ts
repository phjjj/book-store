import { login, resetPassword, resetRequest, signup } from "@/api/auth.api";
import { LoginProps } from "@/pages/Login";
import { useAuthStore } from "@/store/authStore";
import { useAlert } from "./useAlert";
import { useNavigate } from "react-router-dom";
import { SignupProps } from "@/pages/Signup";
import { useState } from "react";

export const useAuth = () => {
  const { storeLogin, storeLogout, isLoogedIn } = useAuthStore();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const userLogin = (data: LoginProps) => {
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

  const userSignup = (data: SignupProps) => {
    signup(data).then((res) => {
      showAlert("회원가입이 완료되었습니다.");
      navigate("/login");
    });
  };

  const userResetPassword = (data: SignupProps) => {
    // 초기화
    resetPassword(data).then(() => {
      showAlert("비밀번호 초기화 성공");
      navigate("/login");
    });
  };
  const [resetRequested, setResetRequested] = useState(false);
  const userResetRequest = (data: SignupProps) => {
    // 요청
    resetRequest(data).then(() => {
      setResetRequested(true);
    });
  };

  return { userLogin, userSignup, userResetPassword, resetRequested, userResetRequest };
};
