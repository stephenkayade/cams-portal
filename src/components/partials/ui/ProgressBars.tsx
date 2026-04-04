import React, { useEffect, useState, useContext, Fragment } from "react"
import helper from "../../../utils/helper.util";
import { clamp, percent } from "framer-motion";

interface IProgressBars {
    percent: number,
    count: number,
    width: number,
    height?: number,
    bgColor?: string,
    activeColor?: string
}
interface IList {
    id: string,
    active: boolean,
    value?: string
}

const ProgressBars = (props: IProgressBars) => {

    const {
        count,
        width,
        height = 48,
        bgColor = '#FFEEAC',
        activeColor = '#F2C200',
        percent,
    } = props;

    const [list, setList] = useState<Array<IList>>([]);
    const [percentage, setPercentage] = useState<number>(0);

    useEffect(() => {

        // Ensure percentage is clamped between 0 and 100
        const clamped = Math.max(0, Math.min(100, parseFloat(percent.toFixed(2))));

        // get number of bars to be active
        const noOfBars = Math.round((clamped / 100) * count);

        let currList: Array<IList> = [];

        for (let i = 0; i < count; i++) {

            let active = i < noOfBars ? true : false;
            let eqact = i === noOfBars;

            if (currList.length < count) {
                currList.push({
                    id: helper.random(6, true).toUpperCase(),
                    active: active,
                    value: eqact ? `${clamped}%` : ''
                })
            }

        }

        setList(currList);
        setPercentage(clamped)

    }, [percent])

    return (
        <>
            <div className="mt-[1rem]">
                <div className="flex items-center gap-x-[0.25rem]">
                    {
                        list.length > 0 &&
                        list.map((item, index) =>
                            <Fragment key={item.id}>
                                <div
                                    className="rounded-[100px] flex-shrink-0 relative"
                                    style={{
                                        backgroundColor: item.active ? activeColor : bgColor,
                                        width: `${width}px`,
                                        height: `${height ? height : '48'}px`,
                                    }}>
                                    {index === 0 && <span className="font-mona-light text-[11px] pag-400 absolute top-[-1rem]">0</span>}
                                    {item.value && parseInt(item.value) > 0 && <span className="font-mona text-[11px] pag-700 absolute top-[-1rem] left-[-0.7rem]">{item.value}</span>}
                                    {(index + 1) === list.length && <span className="font-mona-light text-[11px] pag-400 absolute top-[-1rem] left-[-0.7rem]">100</span>}
                                </div>
                            </Fragment>
                        )
                    }
                </div>
            </div>
        </>
    )
};

export default ProgressBars;
