
import Table from "components/tables";
import User from 'services/user';
import DataModal from "components/modal/DataModal";
import CheckModal from "components/modal/CheckModal";
import React, { useState, useEffect } from "react";

const UserTable = (props) => {
  const [modal, setModal] = useState(null);
  const [error, setError] = useState(null);
  const [roleOptions, setRoleOptions] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    setUserData(props.userData);
    const fetchRoleOptions = async () => {
      const options = await User.roleOptions();
      setRoleOptions(options);
    };
    fetchRoleOptions();
  }, [props.userData]);

  const listColumns = [
    {
      Header: "帳號",
      accessor: "account",
    },
    {
      Header: "名稱",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
  ];

  const options = {
    canCreate : props.canCreate,
    canUpdate : props.canUpdate,
    canDelete : props.canDelete
  }

  const onConfirm = async (eventType, eventData) => {
    console.log(eventType, eventData)
    if (eventType === 'create') {
      const createApi = await User.create(eventData, onCancel);
      if (React.isValidElement(createApi)) {
        setError(createApi);
        return createApi;
      }
      setModal(null)
      setUserData(prevData => [...prevData, eventData]);
    } else if (eventType === 'edit') {
      const editApi = await User.create(eventData, onCancel);
      if (React.isValidElement(editApi)) {
        setError(editApi);
        return editApi;
      }
      setModal(null)
      setUserData(prevData => [...prevData, eventData]);
    } else if (eventType === 'delete') {
      console.log(eventData)
      const deleteApi = await User.delete(eventData, onCancel);
      if (React.isValidElement(deleteApi)) {
        setError(deleteApi);
        return deleteApi;
      }
      setModal(null)
      setUserData(prevData => [...prevData, eventData]);
    }
  };

  const onCancel = () => {
    setModal(null)
    setError(null)
  };

  const handleCreate = async () => {
    const createColumns = [
      {
        Header: "帳號",
        accessor: "account",
        readOnly: false,
        isOptions: false,
      },
      {
        Header: "名稱",
        accessor: "name",
        readOnly: false,
        isOptions: false,
      },
      {
        Header: "密碼",
        accessor: "password",
        readOnly: false,
        isOptions: false,
      },
      {
        Header: "Email",
        accessor: "email",
        readOnly: false,
        isOptions: false,
      },
      {
        Header: "角色",
        accessor: "roles",
        readOnly: false,
        isOptions: true,
        optionsData: {
          name: "角色",
          data: roleOptions
        }
      },
    ]
    setModal(
      <DataModal
        title={"新增使用者"}
        method="create"
        isOpen={true}
        onClose={onCancel}
        columns={createColumns}
        onConfirm = {onConfirm}
      />
    )
  };

  const handleEdit = async (id) => {
    const adminDetail = await User.adminDetail(id);
    const rolesId = adminDetail.roles.map((role) => role.id);

    const editColumns = [
      {
        Header: "ID",
        accessor: "id",
        readOnly: true,
        isOptions: false,
      },
      {
        Header: "帳號",
        accessor: "account",
        readOnly: true,
        isOptions: false,
      },
      {
        Header: "名稱",
        accessor: "name",
        readOnly: false,
        isOptions: false,
      },
      {
        Header: "Email",
        accessor: "email",
        readOnly: false,
        isOptions: false,
      },
      {
        Header: "角色",
        accessor: "roles",
        readOnly: false,
        isOptions: true,
        optionsData: {
          name: "角色",
          data: roleOptions,
          defaultId: rolesId
        }
      },
    ]
    setModal(
      <DataModal
        title={"修改使用者"}
        method="edit"
        isOpen={true}
        onClose={onCancel}
        columns={editColumns}
        data = {adminDetail}
        onConfirm = {onConfirm}
      />
      
    )
  };

  const handleDelete = async (id) => {
    const name = userData.find(user => user.id === id)?.name;

    setModal(
      <CheckModal
        title={`刪除使用者: ${name}`}
        method="delete"
        isOpen={true}
        onClose={onCancel}
        onConfirm = {onConfirm('delete', id)}
      />
    )
  };
  
  return (
    <>
    <Table
      columnsData = {listColumns}
      tableData = {userData}
      handleCreate = {handleCreate}
      handleEdit = {handleEdit}
      handleDelete = {handleDelete}
      options = {options}
    />

    {React.isValidElement(modal) && modal}
    {React.isValidElement(error) && error}
    </>
  )
};

export default UserTable;