
import Tables from "components/tables";

const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "帳號",
      accessor: "account",
    },
    {
      Header: "名稱",
      accessor: "name",
    },
    {
      Header: "EMAIL",
      accessor: "email",
    },
    {
      Header: "角色",
      accessor: "roles",
    },
];


const UserTable = (props) => {
    const data = props.userData
    const options = {
      canUpdate : props.canUpdate,
      canDelete : props.canDelete
    }
    return (
      <Tables columnsData={columns} tableData={data} options={ options } />
    )
};

export default UserTable;