import React, { useEffect, useState } from "react";
import Table from "../tables";
import { adminList } from "services/user";
// import UserCreateButton from "layouts/user/userCreateButton";

const UserIndex = (props) => {
  const { permissions } = props;
  const [userData, setUserData] = useState([]);

  const columns = [
    {
      Header: "ID",
      accessor: "id",
      isVisible: false,
    },
    {
      Header: "帳號",
      accessor: "account",
      isVisible: true,
    },
    {
      Header: "名稱",
      accessor: "name",
      isVisible: true,
      // canModify,
    },
    {
      Header: "EMAIL",
      accessor: "email",
      isVisible: true,
      // canModify,
    },
    {
      Header: "角色",
      accessor: "roles",
      isVisible: false,
      // canModify,
      // isOptions,
    },
  ];

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await adminList(); // 使用 adminList API 獲取用戶資料
      setUserData(response.data.data[0]); // 將資料設定到狀態中
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* <h1>User List</h1> */}
      <Table
        name = "使用者"
        tableType ="columns"
        tableColumn = { columns }
        tableData = { userData }
        permissions={permissions}
        // createButton = {UserCreateButton}
      />
    </div>
  );
};

export default UserIndex;
