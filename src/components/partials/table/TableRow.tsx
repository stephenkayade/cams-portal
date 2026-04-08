import { ReactNode } from "react"

interface ITableRow{
    className?: string,
    children: ReactNode,
    isHeader?: boolean
}

const TableRow = (props: ITableRow) => {

    const {
        className = '',
        children,
        isHeader = false
    } = props;

    return (
        <>
            <tr className={`table-row w-[100%] ${isHeader ? '' : 'bgh-pag-25'} ${className}`}>
                {children}
            </tr>
        </>
    )
};

export default TableRow;
