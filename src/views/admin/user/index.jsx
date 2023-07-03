import React, { useEffect, useState } from "react";
import UserTable from "layouts/user/UserTable";
import User from 'services/user';
import Card from "components/card";
import CardMenu from "components/card/CardMenu";
// import { useNavigate } from "react-router-dom";

const closeModal = () => {
    // navigate("/");
};

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
      const adminList = await User.adminList(closeModal);
      setUserData(adminList[0]); // 將資料設定到狀態中
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card extra={"w-full pb-10 p-4 h-full"}>
       <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          使用者列表
        </div>
        {canCreate &&
          <button className="linear bg-green-500 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:hover:bg-green-300 dark:active:bg-green-200 rounded-xl px-5 py-3 text-base font-medium text-white transition duration-200 dark:text-white">
            新增
          </button>
        }
      </header>
      <div className="mt-8 overflow-x-scroll xl:overflow-hidden">
        <UserTable
          name="使用者"
          userData = { userData }
          canUpdate = { canUpdate }
          canDelete = { canDelete }
        >
        </UserTable>
      </div>
    </Card>
  );
}

