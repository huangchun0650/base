import { createApiInstance } from "../api";

export const login = (credentials) => {
  return createApiInstance("post", "/api/v1/login", credentials, false);
};

export const profile = () => {
  return createApiInstance("get", "/api/v1/self/profile");
};

export const menuList = () => {
  return createApiInstance("get", "/api/v1/self/menuList");
};

export const logout = () => {
  return createApiInstance("post", "/api/v1/logout");
};
