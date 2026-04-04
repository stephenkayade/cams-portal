import React, { useEffect, useState, useContext } from "react"
import { StatusEnum } from "../../../utils/enums.util";
import Divider from "../Divider";

interface ITaskProgress {
    value: string | number,
    width?: string,
    status: string,
    details?: {
        completed?: boolean
    }
}

const TaskProgress = ({ value, status, width = 'w-[100%]', details }: ITaskProgress) => {

    useEffect(() => {

    }, [])

    const cpr = () => {

        let result = { width: 0, background: '' }

        const perce = parseFloat(value ? value.toString() : '0');

        if (perce === 100) {
            result.width = perce;
            result.background = 'bg-pagr-600';
        }
        else if (perce > 1 && perce < 100 && status === StatusEnum.INPROGRESS) {
            result.width = perce;
            result.background = 'bg-pap-500';
        }
        else if (perce > 1 && perce < 100 && status === StatusEnum.DEFAULTED) {
            result.width = perce;
            result.background = 'bg-pay-500';
        }
        else if (perce > 1 && perce < 100 && status === StatusEnum.ABANDONED) {
            result.width = perce;
            result.background = 'bg-pao-500';
        }

        else if (perce <= 1) {
            result.width = perce;
            result.background = 'bg-pay-500';
        }


        return result;
    }

    return (
        <>
            <div className={`flex items-center gap-x-[2.5rem] ${width ? width : 'w-[100%]'}`}>
                <div className="h-[0.4rem] grow rounded-[0px] bg-pag-50">
                    <div className={`${cpr().background} h-[0.4rem]`} style={{ width: `${cpr().width}%` }} />
                </div>
                {
                    !details?.completed &&
                    <>
                        {value && parseFloat(value.toString()) >= 0 && <span className="text-[13px] font-mona gog-700">{value}%</span>}
                    </>
                }
            </div>
            {
                details!?.completed &&
                <>
                    <Divider show={false} padding={{enable: true, top: 'pt-[0.3rem]', bottom: 'pb-[0.3rem]'}} />
                    <div className="flex items-center justify-between">
                        <h3 className="font-rethink pagr-800 text-[13px]">Progress</h3>
                        <p className="font-rethink text-[13px]">{value && parseFloat(value.toString()) >= 0 && <span className="text-[13px] font-mona gog-700">{value}%</span>}                    </p>
                    </div>
                </>

            }
        </>
    )
};

export default TaskProgress;
