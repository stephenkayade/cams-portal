import React, { useEffect, useState, useContext } from "react"
import { ISVGIcon } from "../../../utils/interfaces.util";

const SRCIcon = (props: ISVGIcon) => {

    const {
        name,
        position = 'relative',
        className = '',
        style = {},
        width = 'w-6',
        height = 'h-6',
        size = 14,
        stroke = 1,
        onClick
    } = props;

    useEffect(() => {

    }, [])

    const cc = () => {
        let result = `${width ? width : ''} ${height ? height : ''} ${position}`

        if (className) {
            result = result + ` ${className}`
        }
        return result;
    }

    return (
        <>
            {
                (name === 'cancel' || name === 'x') &&
                <>
                    <svg
                        style={style}
                        className={cc()}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width={stroke.toString()} d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </>
            }
            {
                name === 'check' &&
                <>
                    <svg
                        style={style}
                        className={cc()}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width={stroke.toString()} d="M5 13l4 4L19 7"></path>
                    </svg>
                </>
            }
        </>
    )
};

export default SRCIcon;
