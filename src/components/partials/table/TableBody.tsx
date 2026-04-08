import { ReactNode } from "react"

interface ITableBody{
    className?: string,
    children: ReactNode
}

const TableBody = (props: ITableBody) => {

    const {
        className = '',
        children
    } = props;

    return (
        <>
            <tbody className={`table-body w-[100%] ${className}`}>
                {children}
            </tbody>
        </>
    )
};

export default TableBody;
