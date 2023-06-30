import axios from "axios";

export const createApiInstance = (
  method,
  url,
  data = {},
  includeToken = true
) => {
  const instance = axios.create({
    baseURL: "http://laravel.baseplate",
    headers: {},
  });

  // 攔截請求
  instance.interceptors.request.use((config) => {
    if (includeToken) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });

  // 攔截響應
  instance.interceptors.response.use(
    (response) => {
      console.log("攔截器：請求成功");
      return response;
    },
    (error) => {
      console.log("攔截器：響應錯誤", error);
      const response = error.response;
      if (
        response &&
        response.data &&
        response.data.code === 100000 &&
        response.data.message === "未驗證。"
      ) {
        console.log("Token過期，需要重新登錄");
      }

      // 彈出模態框
      const modalContent = {
        title: "請求錯誤",
        message: "發生了一個錯誤，請稍後再試。",
        buttonText: "關閉",
      };
    }
  );

  return instance({
    method,
    url,
    data,
  });
};

export default createApiInstance;
