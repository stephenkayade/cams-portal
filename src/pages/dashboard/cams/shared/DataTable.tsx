import React from "react";
import EmptyState from "../../../../components/partials/dialogs/EmptyState";
import TableFooter from "../../../../components/partials/table/TableFooter";
import Table from "../../../../components/partials/table/Table";
import TableBody from "../../../../components/partials/table/TableBody";
import TableBox from "../../../../components/partials/table/TableBox";
import TableHeader from "../../../../components/partials/table/Tableheader";
import TableRow from "../../../../components/partials/table/TableRow";
import CellData from "../../../../components/partials/table/CellData";
import Popout from "../../../../components/partials/drops/Popout";
import { ICollection, IListQuery, IPopoutItem } from "../../../../utils/interfaces.util";

interface ITable {
    headers: Array<string>;
    rows: Array<Array<React.ReactNode>>;
    empty: string;
    rowActions?: Array<Array<IPopoutItem>>;
    pagination?: {
        title: string;
        source: ICollection;
        limit?: number;
        onChange(data: IListQuery): Promise<void>;
    };
}

const DataTable = ({ headers, rows, empty, rowActions, pagination }: ITable) => {
    const hasActions = Boolean(rowActions && rowActions.some((items) => items.length > 0));
    const renderedHeaders = hasActions && !headers.includes("Actions") ? [...headers, "Actions"] : headers;

    const renderEmpty = () => (
        <EmptyState className="min-h-[220px]">
            <div className="px-[1rem] text-center">
                <p className="font-uncut-semibold text-[20px] pag-900">Nothing to show yet</p>
                <p className="mt-[0.4rem] font-mona-light text-[14px] pag-500">{empty}</p>
            </div>
        </EmptyState>
    );

    return (
        <div className="space-y-[0.75rem]">
            {rows.length === 0 ? (
                renderEmpty()
            ) : (
                <TableBox>
                    <Table>
                        <TableHeader items={renderedHeaders.map((label) => ({ label }))} />
                        <TableBody>
                            {rows.map((row, rowIndex) => (
                                <TableRow key={`data-row-${rowIndex + 1}`}>
                                    {row.map((cell, cellIndex) => (
                                        <CellData key={`data-row-${rowIndex + 1}-cell-${cellIndex + 1}`}>
                                            {cell}
                                        </CellData>
                                    ))}
                                    {hasActions && (
                                        <CellData className="w-[64px]">
                                            <div className="flex justify-end">
                                                <Popout
                                                    position="bottom-right"
                                                    noFilter={false}
                                                    menu={{
                                                        search: false,
                                                        className: "min-w-[11rem]",
                                                        fullWidth: false,
                                                        limitHeight: "sm"
                                                    }}
                                                    items={rowActions?.[rowIndex] || []}
                                                />
                                            </div>
                                        </CellData>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableBox>
            )}

            {pagination && (
                <TableFooter
                    title={pagination.title}
                    type="self"
                    resource="default"
                    source={pagination.source}
                    limit={pagination.limit}
                    onChange={pagination.onChange}
                />
            )}
        </div>
    );
};

export default DataTable;
