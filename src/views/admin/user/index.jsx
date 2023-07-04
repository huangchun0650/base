import React, { useEffect, useState } from "react";
import UserTable from "layouts/user/UserTable";
import User from 'services/user';

export default function Users(props) {
  const { permissions } = props;
  const canCreate = permissions[0]["admin.create"];
  const canUpdate = permissions[3]["admin.update"];
  const canDelete = permissions[4]["admin.delete"];
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const adminList = await User.adminList();
      setUserData(adminList[0]); // 將資料設定到狀態中
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserTable
      name="使用者"
      userData = { userData }
      canCreate = { canCreate }
      canUpdate = { canUpdate }
      canDelete = { canDelete }
    />
  );
}

