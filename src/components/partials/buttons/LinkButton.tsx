import React, { useEffect, useState, useContext } from "react"
import Icon from "../icons/Icon";
import { ILinkButton } from "../../../utils/interfaces.util";
import { Link } from "react-router-dom";

const LinkButton = (props: ILinkButton) => {

    const {
        text = {
            label: 'Click Link',
            className: '',
            weight: 'semibold',
            color: 'pacb-900',
            size: 13
        },
        url = '',
        className = '',
        disabled = false,
        loading = false,
        icon = {
            enable: true,
            child: <Icon type="feather" name="chevron-right" size={15} className="pacb-900" />
        },
        onClick
    } = props;

    useEffect(() => {

    }, [])

    const handleClick = (e: any) => {

        if (e) { e.preventDefault() }

        if (url) {
            onClick(e);
            window.open(url, '_blank');

        } else {
            onClick(e)
        }

    }

    const cp = () => {
        let result = { style: '', class: '', size: '13px' };

        if(text.color && text.color.includes('#')){
            result.style = text.color
        }else {
            result.class = text.color ? text.color : 'pacb-900'
        }

        if(text.size !== undefined){
            result.size = `${text.size}px`;
        }

        return result
    }

    return (
        <>
            <Link onClick={(e) => handleClick(e)} to={''} className={`inline-flex transition-all duration-[0.25s] items-center ${className} ${disabled ? 'disabled-light' : ''}`}>
                <span style={{ color: `${cp().style}`, fontSize: cp().size }} className={`font-mona${text.weight === 'regular' ? '' : '-'+text.weight} ${cp().class} pr-[0.2rem] ${text.className}`}>{text.label}</span>
                {
                    icon.enable &&
                    <span style={{ color: `${cp().style}`, }} className={`ml-auto ${cp().class}`}>
                        {icon.child}
                    </span>
                }
            </Link>
        </>
    )
};

export default LinkButton;
