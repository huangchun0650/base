import axios from "axios";

const baseUrl = "http://34.81.198.236";

const api = (method, url, data, useToken = false) => {
  // 设置请求配置对象
  const config = {
    method: method,
    url: baseUrl + url,
    data: data,
  };

  if (useToken) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
  }

  return axios(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export default api;
