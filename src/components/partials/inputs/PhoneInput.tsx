import React, { useEffect, useRef, useImperativeHandle, forwardRef, ForwardedRef } from "react"
import { IPhoneInput, } from "../../../utils/interfaces.util";
import helper from "../../../utils/helper.util";
import { Link } from "react-router-dom";
import FormField from "./FormField";
import Filter from "../drops/Filter";
import TextInput from "./TextInput";

const PhoneInput = forwardRef((props: IPhoneInput, ref: ForwardedRef<any>) => {

    const {
        textInput: ti,
        filter: fi,
        width,
        gap,
        label
    } = props

    useEffect(() => {

    }, [])

    // expose child component functions to parent component
    useImperativeHandle(ref, () => ({
        clear: () => { },
        focus: () => { }
    }))

    return (
        <>

            <FormField className="w-full">
                {
                    label &&
                    <label htmlFor={''} className={`mrgb0 ${label.className ? label.className : ''}`}>
                        <span className={`font-mona pag-900`} style={{ fontSize: `${label.fontSize}px` }}>{label.title}</span>
                        {label.required ? <span className="color-red font-mona-medium relative text-[16px] top-[5px] left-[3px]">*</span> : ''}
                    </label>
                }

                <div className={`flex items-center ${gap ? gap : 'gap-x-[0.5rem]'}`}>
                    <div className={`flex-col ${ width ? width : 'w-1/3' }`}>
                        <Filter
                            {...fi}
                        />
                    </div>
                    <div className="flex-col grow">
                        <TextInput
                            {...ti}
                        />
                    </div>
                </div>
            </FormField>

        </>
    )

})

export default PhoneInput;
