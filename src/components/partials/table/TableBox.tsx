import { ReactNode } from "react"

interface ITableBox{
    children: ReactNode,
    className?: string
}

const TableBox = ({ children, className = '' }: ITableBox) => {

    const cc = () => {
        let result = `tablebox responsive w-full`
        if(className){
            result = result + ` ${className}`
        }
        return result;
    }

    return (
        <>
            <div id="tablebox" className={cc()}>
                { children }
            </div>
        </>
    )
};

export default TableBox;
