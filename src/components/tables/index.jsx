import React, { useMemo } from "react";
import Card from "components/card";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";


const Table = (props) => {
  const { columnsData, tableData, handleCreate, handleEdit, handleDelete, hiddenColumns = [] } = props;
  const canCreate = props.options['canCreate']
  const canUpdate = props.options['canUpdate']
  const canDelete = props.options['canDelete']

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns:columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 5;

  return (
    <Card extra={"w-full pb-10 p-4 h-full"}>
       <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          使用者列表
        </div>
        {canCreate &&
          <button
            className="linear bg-green-500 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:hover:bg-green-300 dark:active:bg-green-200 rounded-xl px-5 py-3 text-base font-medium text-white transition duration-200 dark:text-white"
            onClick={() => {
              handleCreate()
            }}>
            新增
          </button>
        }
      </header>
      <div className="mt-8 overflow-x-scroll xl:overflow-hidden">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  hiddenColumns.includes(index) ? null : (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={index}
                      className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700"
                    >
                      <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                        {column.render("Header")}
                      </div>
                    </th>
                  )
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, cellIndex) => (
                    hiddenColumns.includes(cellIndex) ? null : (
                      <td
                        className="pt-[14px] pb-[20px] sm:text-[14px]"
                        {...cell.getCellProps()}
                        key={cellIndex}
                      >
                        <div className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </div>
                      </td>
                    )
                  ))}
                  <td>
                    <div className="inline-flex flex-row-reverse space-x-2">
                      {canDelete && (
                        <button
                          className="linear bg-red-500 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:hover:bg-red-300 dark:active:bg-red-200 rounded-xl px-3 py-2 text-sm font-medium text-white transition duration-200 dark:text-white h-full whitespace-nowrap"
                          id={row.original.id}
                          onClick={() => {
                            handleDelete(row.original.id)
                          }}
                        >
                          刪除
                        </button>
                      )}
                      {canUpdate && canDelete && (
                        <span className="w-2"></span>
                      )}
                      {canUpdate && (
                        <button
                          className="linear bg-green-500 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:hover:bg-green-300 dark:active:bg-green-200 rounded-xl px-3 py-2 text-sm font-medium text-white transition duration-200 dark:text-white h-full whitespace-nowrap"
                          id={row.original.id}
                          onClick={() => {
                            handleEdit(row.original.id)
                          }}
                        >
                          修改
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default Table;
