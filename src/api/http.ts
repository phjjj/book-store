import axios, { AxiosRequestConfig } from "axios";
import { getToken, removeToken } from "../store/auth.store";

const BASE_URL = "http://localhost:9999";
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      "content-type": "application/json",
      Authorization: getToken() ? `Bearer ${getToken()}` : "",
    },
    withCredentials: true,
    ...config,
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      // 토큰이 있을 경우
      // 인터셉터에서도 설정이 가능하다 res가 오면 여기서 처리를 해줄 수 있다.
      // if (response.headers.authorization) {
      //   localStorage.setItem("token", response.headers.authorization);
      // }
      // console.log(response);
      return response;
    },
    (error) => {
      // 로그인 만료시 처리
      if (error.response.status === 401) {
        removeToken();
        window.location.href = "/login";
        return;
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

// 이렇게 할 경우 http 공통 모듈에서는 axiosInstance를 사용하게 된다. 와이리 어렵노
export const httpclient = createClient();
