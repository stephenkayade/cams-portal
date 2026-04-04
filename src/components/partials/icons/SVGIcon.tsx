import React, { useEffect, useState, useContext } from "react"
import { ISVGIcon } from "../../../utils/interfaces.util";

const SVGIcon = (props: ISVGIcon) => {

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
            {
                name === 'roads' &&
                <>
                    <svg
                        style={style}
                        className={cc()}
                        width={style.width ? style.width : '75'}
                        height={style.height ? style.height : '38'}
                        fill="none"
                        viewBox="0 0 75 38"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect x="7" width="61" height="10" fill="#DDE9F5" />
                        <rect y="28" width="58" height="10" fill="#DDE9F5" />
                        <rect x="24" y="14" width="51" height="10" fill="#D2E6FA" />
                    </svg>
                </>
            }
            {
                name === 'roads-green' &&
                <>
                    <svg
                        style={style}
                        className={cc()}
                        width={style.width ? style.width : '800'}
                        height={style.height ? style.height : '801'}
                        viewBox="0 0 800 801" fill="none" 
                        xmlns="http://www.w3.org/2000/svg">
                        <circle cx="400" cy="400.527" r="400" fill="#D0FFD7" />
                        <rect x="218.057" y="286.76" width="365.234" height="59.8745" fill="#94D998" />
                        <rect x="176.146" y="454.416" width="347.272" height="59.8745" fill="#94D998" />
                        <rect x="319.848" y="370.598" width="305.36" height="59.8745" fill="#FCFCFC" />
                    </svg>

                </>
            }
        </>
    )
};

export default SVGIcon;
