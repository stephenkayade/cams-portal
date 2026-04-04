import React, { useEffect, useState, useCallback } from "react"

interface ISliderInput{
    foreColor: string,
    backColor: string,
    thumbColor: string,
    min?: number,
    max?: number,
    currValue?: number,
    onChange(value: number): void
}

const SliderInput = (props: ISliderInput) => {

    const {
        foreColor,
        backColor,
        thumbColor,
        min = 0,
        max = 100,
        currValue = 20,
        onChange
    } = props;

    const [sliderValue, setSliderValue] = useState(3); // Initial value

    useEffect(() => {

        setSliderValue(currValue)

    }, [currValue, min, max])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSliderValue(Number(e.target.value));
        onChange(Number(e.target.value))
    }, []);

    const cc = () => {
        let result = `w-full h-[6px] bg-pag-50 appearance-none cursor-pointer`;

        // thumb webkit styles
        result = result + ` [&::-webkit-slider-thumb]:w-[22px] [&::-webkit-slider-thumb]:h-[22px]`
        result = result + ` [&::-webkit-slider-thumb]:bg-[#71CBFC] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:-mt-[2px]`
        result = result + ` [&::-webkit-slider-thumb]:appearance-none`

        // range moz styles
        result = result + ` [&::-moz-range-thumb]:w-[22px] [&::-moz-range-thumb]:h-[22px]`
        result = result + ` [&::-moz-range-thumb]:bg-[#71CBFC] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:-mt-[2px]`
        result = result + ` [&::-moz-range-thumb]:appearance-none`

        return result;
    }

    return (
        <>
            <input
                type="range"
                id="number-slider"
                min={min}
                max={max}
                defaultValue={sliderValue}
                onChange={handleChange}
                className={cc()}
                style={{
                    background: `linear-gradient(to right, ${foreColor} 0%, ${foreColor} ${((sliderValue - min) / (max - min)) * 100}%, ${backColor} ${((sliderValue - min) / (max - min)) * 100}%, ${backColor} 100%)`
                }}
            />
        </>
    )
};

export default SliderInput;
