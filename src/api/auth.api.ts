import { SignupProps } from "../pages/Signup";
import { httpclient } from "./http";

export const signup = async (userData: SignupProps) => {
  const response = await httpclient.post("/users/join", userData);
  return response.data;
};

export const resetRequest = async (data: SignupProps) => {
  const response = await httpclient.post("/users/reset", data);
  return response.data;
};

export const resetPassword = async (data: SignupProps) => {
  const response = await httpclient.put("/users/reset", data);
  return response.data;
};

interface LoginResponse {
  headers: any;
  token: string;
}
export const login = async (data: SignupProps) => {
  const response = await httpclient.post<LoginResponse>("/users/login", data);

  return response;
};
