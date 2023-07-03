import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

const Table = (props) => {
  const { columnsData, tableData } = props;

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

  // 隐藏的列索引
  const hiddenColumns = [0,4]; // 假设要隐藏第二列

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
                    <div className="flex space-x-2">
                      <button
                        className="linear bg-green-500 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:hover:bg-green-300 dark:active:bg-green-200 rounded-xl px-5 py-3 text-base font-medium text-white transition duration-200 dark:text-white"
                        onClick={() => {
                          console.log('Button clicked!');
                        }}
                        >
                        修改
                      </button>
                      <button id={row.original.id} {...props} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
  );
};

export default Table;
