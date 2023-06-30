import { createApiInstance } from "../api";

export const adminList = () => {
  return createApiInstance("get", "/api/v1/admin");
};

export const adminDetail = (id) => {
  return createApiInstance("get", "/api/v1/admin/" + id);
};
