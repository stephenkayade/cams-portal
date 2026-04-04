import React, { useEffect, useState, useContext, ReactNode } from "react"
import { FontFamilyType, FontWeightType } from "../../../utils/types.util";

interface IPageHeader {
    title: {
        text: string,
        font?: FontFamilyType,
        weight?: FontWeightType
    },
    description?: string,
    children?: ReactNode,
}

const PageHeader = (props: IPageHeader) => {

    const {
        title,
        description = '',
        children = null
    } = props;

    useEffect(() => {

    }, [])

    const cf = () => {
        let result = 'font'

        if (title.font) {
            result = result + `-${title.font}`
        } else {
            result = result + `-mona`
        }

        if (title.weight) {
            result = result + `-${title.weight}`
        }

        return result;
    }

    return (
        <>
            <div className="page-header w-full flex items-center">

                <div className="space-y-[0.2rem]">
                    <h2 className={`${cf()} text-[16px] pag-700`}>{title.text}</h2>
                    <p className="font-mona-light text-[14px] pag-400">{description}</p>
                </div>

                {
                    children &&
                    <div className="ml-auto">
                        {children}
                    </div>
                }

            </div>
        </>
    )
};

export default PageHeader;
