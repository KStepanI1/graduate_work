import {
    ColumnDef,
    PaginationState,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import cls from "./Table.module.scss";
import Button, { ThemeButton } from "shared/ui/Button/Button";
import Input from "shared/ui/Input/Input";
import { useMemo } from "react";

export interface TableProps<T> {
    data: T[];
    columns: ColumnDef<T>[];
    className?: string;
    dataAmountTotal: number;
    pagination: PaginationState;
    onPaginationChange?: (newPagination: PaginationState) => void;
    isDataFetching?: boolean;
}

const Table = <T extends object>(props: TableProps<T>) => {
    const {
        data,
        columns,
        className,
        dataAmountTotal = 0,
        pagination,
        onPaginationChange,
        isDataFetching = false,
    } = props;

    const table = useReactTable({
        data,
        columns,
        rowCount: dataAmountTotal,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        state: {
            pagination,
        },
        onPaginationChange,
    });

    const PAGINATION = useMemo(() => {
        return (
            <div className={generateClassNames(cls.pagination)}>
                <Button
                    theme={ThemeButton.CLEAR}
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {"<<"}
                </Button>
                <Button
                    theme={ThemeButton.CLEAR}
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {"<"}
                </Button>
                <Button
                    theme={ThemeButton.CLEAR}
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {">"}
                </Button>
                <Button
                    theme={ThemeButton.CLEAR}
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {">>"}
                </Button>
                <span className={cls.pageInfo}>
                    <div>Страница</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} из{" "}
                        {table.getPageCount().toLocaleString()}
                    </strong>
                </span>
                <span className={generateClassNames(cls.goToPage)}>
                    | Перейти на страницу:
                    <Input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(value) => {
                            const page = Number(value) ? Number(value) - 1 : 0;
                            if (value) table.setPageIndex(page);
                        }}
                    />
                </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Показывать {pageSize}
                        </option>
                    ))}
                </select>
                {isDataFetching ? "Loading..." : null}
            </div>
        );
    }, [isDataFetching, table]);

    return (
        <div className={generateClassNames(cls.wrapper)}>
            {PAGINATION}
            <table className={generateClassNames(cls.Table, className)}>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr
                            key={headerGroup.id}
                            className={generateClassNames(cls.header, cls.row)}
                        >
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className={generateClassNames(cls.cell)}
                                    style={{
                                        width: header.getSize() ?? "100%",
                                        maxWidth: header.getSize() ?? "100%",
                                    }}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr
                            key={row.id}
                            className={generateClassNames(cls.row)}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className={generateClassNames(cls.cell)}
                                    style={{
                                        width: cell.column.getSize() ?? "100%",
                                        maxWidth:
                                            cell.column.getSize() ?? "100%",
                                    }}
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    {table.getFooterGroups().map((footerGroup) => (
                        <tr key={footerGroup.id}>
                            {footerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.footer,
                                              header.getContext()
                                          )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>
        </div>
    );
};

export default Table;
