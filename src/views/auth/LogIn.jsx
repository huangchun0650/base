import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "components/fields/InputField";
import Auth from 'services/auth';

export default function LogIn() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  const closeModal = () => {
  };

  const handleLogin = async () => {
    try {
      const credentials = {
        account: account,
        password: password
      };
      const response = await Auth.login(credentials, closeModal);

      if (React.isValidElement(response)) {
        setResponse(response);
        return response; // 直接返回错误模态框元素
      }

      const token = response.token;
      localStorage.setItem("token", token);

      navigate("/admin/dashboard");
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
        {/* Login section */}
        <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
          <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
            英富開發
          </h4>
          <p className="mb-9 ml-1 text-base text-gray-600">
            Enter your account and password to login in
          </p>
          {/* Account */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="帳號"
            placeholder="輸入帳號"
            id="account"
            type="text"
            value={account}
            onChange={(e) => {setAccount(e.target.value)}}
          />

          {/* Password */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="密碼"
            placeholder="輸入密碼"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            onClick={handleLogin}
          >
            Log In
          </button>
        </div>
      </div>

      {/* 模态框 */}
      {React.isValidElement(response) && response}
    </>
  );
}
