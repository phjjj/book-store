import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SignupStyle } from "./Signup";
import { useAuth } from "@/hooks/useAuth";

export interface SignupProps {
  email: string;
  password: string;
}

const ResetPassword = () => {
  const { userResetPassword, userResetRequest, resetRequested } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();

  const onSubmit = (data: SignupProps) => {
    resetRequested ? userResetPassword(data) : userResetRequest(data);
  };

  return (
    <>
      <Title size="large">비밀번호 초기화</Title>
      <SignupStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText {...register("email", { required: true })} inputType="email" placeholder="이메일" />
            {errors.email && <p className="error-text">이메일을 입력해주세요.</p>}
          </fieldset>
          {resetRequested && (
            <fieldset>
              <InputText
                {...register("password", { required: true })}
                autoComplete="off"
                inputType="password"
                placeholder="비밀번호"
              />
              {errors.email && <p className="error-text">비밀번호를 입력해주세요.</p>}
            </fieldset>
          )}
          <fieldset>
            <Button type="submit" size="medium" schema="primary">
              {resetRequested ? "비밀번호 초기화" : "초기화 요청"}
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

export default ResetPassword;
