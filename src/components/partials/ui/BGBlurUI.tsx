import Button from "../buttons/Button";
import Icon from "../icons/Icon";

interface IBGBlurUI {
    className?: string,
    message?: string,
    button?: {
        text: string,
        loading: boolean,
        onClick(e: any): void
    }
}

const BGBlurUI = (props: IBGBlurUI) => {

    const {
        className,
        message,
        button
    } = props;

    const cc = () => {
        let result: string = 'absolute z-20 left-0 right-0 top-0 bottom-0 flex flex-col justify-center items-center bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/50'
        if (className) {
            result = result + ` ${className}`
        }
        return result;
    }

    return (
        <>
            <div className={cc()}>
                <div className="w-[43%] mx-auto my-0 text-center space-y-[1.5rem]">
                    {message && <p className="font-mona-medium text-[15px] pas-950">{message}</p>}
                    {
                        button &&
                        <Button
                            type="primary"
                            semantic="info"
                            size="sm"
                            loading={button.loading}
                            disabled={false}
                            block={false}
                            className=""
                            icon={{
                                enable: true,
                                child: <Icon name="nav-arrow-right" type="polio" size={16} />
                            }}
                            text={{
                                label: button.text,
                                size: 13,
                                weight: 'medium'
                            }}
                            onClick={(e) => button.onClick(e)}
                        />
                    }
                </div>
            </div>
        </>
    )
};

export default BGBlurUI;
