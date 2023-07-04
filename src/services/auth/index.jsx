import React from "react";
import api from "services/api";
import ErrorModal from "components/modal/ErrorModal";

const Auth = {
  login: async (credentials, onClose) => {
    try {
      const response = await api("POST", "/api/v1/login", credentials);
      return response.data;
    } catch (error) {
      let message = error.response.data.message;
      
      return (
        <ErrorModal isOpen={true} onClose={onClose} errorMessage={message} />
      );
    }
  },

  profile: async (onClose) => {
    try {
      const response = await api("GET", "/api/v1/self/profile", null, true);
      return response.data;
    } catch (error) {
      let message = error.response.data.message;

      if (message === "Unauthenticated.") {
        message = "token 已過期，請重新登入"
      }
      
      return (
        <ErrorModal isOpen={true} onClose={onClose} errorMessage={message} />
      );
    }
  },

  menuList: async (onClose) => {
    try {
      const response = await api("GET", "/api/v1/self/menuList", null, true);
      return response.data;
    } catch (error) {
      let message = error.response.data.message;

      if (message === "Unauthenticated.") {
        message = "token 已過期，請重新登入"
      }
      
      return (
        <ErrorModal isOpen={true} onClose={onClose} errorMessage={message} />
      );
    }
  },

  logout: async (onClose) => {
    try {
      const response = await api("POST", "/api/v1/logout", null, true);
      return response.data;
    } catch (error) {
      let message = error.response.data.message;

      if (message === "Unauthenticated.") {
        message = "token 已過期，請重新登入"
      }
      
      return (
        <ErrorModal isOpen={true} onClose={onClose} errorMessage={message} />
      );
    }
  },
};

export default Auth;

