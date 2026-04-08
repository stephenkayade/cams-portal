import { ReactNode } from "react"
import CardUI from "./CardUI";

interface IListBox {
    children: ReactNode,
    className?: string
}

const ListBox = ({ children, className = '' }: IListBox) => {

    return (
        <>
            <CardUI>

                <div id="listbox" className={`listbox ${className}`}>
                    {children}
                </div>

            </CardUI>
        </>
    )
};

export default ListBox;
