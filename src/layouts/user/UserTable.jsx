
import Table from "components/tables";
import User from 'services/user';
import DataModal from "components/modal/DataModal";
import CheckModal from "components/modal/CheckModal";
import React, { useState, useEffect } from "react";

const UserTable = (props) => {
  const [eventData, setEventData] = useState(null);
  const [modal, setModal] = useState(null);
  const [roleOptions, setRoleOptions] = useState([]);

  useEffect(() => {
    const fetchRoleOptions = async () => {
      const options = await User.roleOptions();
      setRoleOptions(options);
    };

    fetchRoleOptions();
  }, []);


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
  const data = props.userData
  const options = {
    canCreate : props.canCreate,
    canUpdate : props.canUpdate,
    canDelete : props.canDelete
  }

  const onConfirm = (eventType, eventData) => {
    console.log(eventType, eventData)
    if (eventType === 'create') {
      // create 事件
      console.log('Create event:');
    } else if (eventType === 'edit') {
      // edit 事件
      console.log('Edit event:');
    } else if (eventType === 'delete') {
      // delete 事件
      console.log('Delete event:');
    }
  };

  const onCancel = () => {
    setModal(null)
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
    const name = data.find(user => user.id === id)?.name;

    setModal(
      <CheckModal
        title={`刪除使用者: ${name}`}
        method="delete"
        isOpen={true}
        onClose={onCancel}
        onConfirm = {onConfirm}
      />
    )
  };
  
  return (
    <>
    <Table
      columnsData = {listColumns}
      tableData = {data}
      handleCreate = {handleCreate}
      handleEdit = {handleEdit}
      handleDelete = {handleDelete}
      options = {options}
    />

    {React.isValidElement(modal) && modal}
    </>
  )
};

export default UserTable;