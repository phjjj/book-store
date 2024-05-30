import { SignupProps } from "../pages/Signup";
import { httpclient } from "./http";

export const signup = async (userData: SignupProps) => {
  const response = await httpclient.post("/users/join", userData);
  return response.data;
};
