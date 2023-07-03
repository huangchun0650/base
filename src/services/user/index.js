import React from "react";
import api from "services/api";
import ErrorModal from "components/modal/ErrorModal";

const User = {
  adminList: async (onClose) => {
    try {
      const response = await api("GET", "/api/v1/admin", null, true);
      return response.data;
    } catch (error) {
      let message = error.response.data.message;

      if (message == "Unauthenticated.") {
        message = "token 已過期，請重新登入";
      }
      
      return (
        <ErrorModal isOpen={true} onClose={onClose} errorMessage={message} />
      );
    }
  },

  adminDetail: async (id, onClose) => {
    try {
      const response = await api("GET", "/api/v1/admin" + id, null, true);
      return response.data;
    } catch (error) {
      let message = error.response.data.message;

      if (message == "Unauthenticated.") {
        message = "token 已過期，請重新登入";
      }

      return (
        <ErrorModal isOpen={true} onClose={onClose} errorMessage={message} />
      );
    }
  },
};

export default User;

