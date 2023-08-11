import {
  Column,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import Spacer from "./Spacer";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

type TableProps = {
  data: any;
  columns: Array<Column<any>>;
  actionButton?: React.ReactNode;
  dataCount: number;
};

const Table: React.FC<TableProps> = ({
  data,
  columns,
  actionButton,
  dataCount,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    nextPage,
    previousPage,
    setPageSize,
    gotoPage,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 15 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  return (
    <div className="w-full">
      <div
        className={`flex w-full ${
          actionButton ? "justify-between" : "justify-end"
        }
        `}
      >
        {actionButton}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Search..."
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
      </div>
      <Spacer amount="3" />
      <table className="w-full text-left text-gray-500 " {...getTableProps()}>
        <thead className="bg-gray-50 text-sm uppercase text-gray-700 ">
          {headerGroups.map((headerGroup, i) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column, i) => (
                <th
                  className="px-6 py-3"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={i}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                className="h-24 border-b bg-white"
                {...row.getRowProps({
                  exit: { opacity: 0, maxHeight: 0 },
                } as any)}
                key={i}
              >
                {row.cells.map((cell, i) => {
                  return (
                    <td
                      className="px-6 py-4 text-center"
                      {...cell.getCellProps()}
                      key={i}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav
        className="flex items-center justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal">
          Showing{" "}
          <span className="">
            {1 + pageIndex * pageSize}-{page.length + pageIndex * pageSize}
          </span>{" "}
          of <span className="">{dataCount}</span>
        </span>
        <ul className="inline-flex items-center -space-x-px">
          <li
            className="cursor-pointer rounded-l-md border-2 p-2 hover:bg-gray-200"
            onClick={() => {
              gotoPage(0);
            }}
          >
            <ChevronsLeft className="h-6 w-6" />
          </li>
          <li
            className="cursor-pointer border-2 p-2 hover:bg-gray-200"
            onClick={previousPage}
          >
            Prev
          </li>
          {[
            pageIndex - 2,
            pageIndex - 1,
            pageIndex,
            pageIndex + 1,
            pageIndex + 2,
            pageIndex + 3,
            pageIndex + 4,
            pageIndex + 5,
          ]
            .filter((pageNo) => pageNo > 0 && pageNo <= pageOptions.length)
            .map((page, i) => {
              if (i > 4) return null;
              return (
                <li
                  key={page}
                  onClick={() => {
                    gotoPage(page - 1);
                  }}
                  className={`cursor-pointer border-2 py-2 px-4 hover:bg-gray-200 ${
                    pageIndex + 1 === page ? "bg-gray-200 font-semibold" : ""
                  }`}
                >
                  {page}
                </li>
              );
            })}
          <li
            className="cursor-pointer border-2 p-2 hover:bg-gray-200"
            onClick={nextPage}
          >
            Next
          </li>
          <li
            className="cursor-pointer rounded-r-md border-2 p-2 hover:bg-gray-200"
            onClick={() => {
              gotoPage(pageCount - 1);
            }}
          >
            <ChevronsRight className="h-6 w-6" />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Table;
