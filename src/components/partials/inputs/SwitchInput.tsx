import React, { useEffect, useState, useContext, forwardRef, ForwardedRef, useRef } from "react"
import { ISwitchInput } from "../../../utils/interfaces.util";
import useSize from "../../../hooks/useSize";
import helper from "../../../utils/helper.util";
import { Link } from "react-router-dom";

const SwitchInput = forwardRef((props: ISwitchInput, ref: ForwardedRef<any>) => {

    const {
        id,
        checked,
        ariaLabel,
        disabled,
        className,
        label,
        size = 'rg',
        onChange
    } = props

    const { switchMap } = useSize({ size, type: 'switch' });
    const [inputId, setInputId] = useState<string>(helper.random(8, true))
    const inputRef = useRef<any>(null)

    const [isChecked, setIsChecked] = useState<boolean>(checked);
    const [sizes, setSizes] = useState(switchMap[size])

    useEffect(() => {

    }, [])

    const cc = () => {

        let result = `inline-flex items-center gap-1`

        if (className) {
            result = result + ` ${className}`
        }

        return result;

    }

    const cs = () => {

        let result = `relative inline-flex items-center rounded-full transition-colors duration-300 focus:outline-none disabled:cursor-not-allowed ${sizes.track}`

        if (disabled) {
            result = result + ` disabled-light`
        }

        if (isChecked) {
            result = result + ` bg-pagr-600`
        } else {
            result = result + ` bg-pag-300`
        }

        return result;

    }

    const cknob = () => {

        let result = `absolute left-0.5 top-0.5 rounded-full bg-white shadow-sm transition-transform duration-300 ${sizes.knob}`

        if (isChecked) {
            result = result + ` ${sizes.translate}`
        } else {
            result = result + ` translate-x-0`
        }

        return result;

    }

    const handleToggle = () => {
        if(!disabled){
            if(isChecked){
                setIsChecked(false)
                onChange(false)
            } else {
                setIsChecked(true)
                onChange(true)
            }
        }
    }


    return (
        <>
            <div className={cc()}>

                <Link
                    ref={inputRef}
                    to={''}
                    id={id ? id : inputId}
                    role="switch"
                    aria-checked={isChecked}
                    aria-label={label ? undefined : ariaLabel}
                    className={cs()}
                    onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                            e.preventDefault();
                            handleToggle();
                        }
                    }}
                    onClick={handleToggle}
                >
                    <span className={cknob()}></span>
                </Link>

                {
                    label &&
                    <>
                        <span
                            style={{ fontSize: `${label.size ? label.size : '13'}px` }}
                            className={`pas-950 font-mona${label.weight && label.weight !== 'regular' ? '-' + label.weight : ''} ${disabled ? 'disabled-light' : ''} ${label.className ? label.className : ''}`}>
                            {label.text}
                        </span>
                    </>
                }

            </div>
        </>
    )

})

export default SwitchInput;
