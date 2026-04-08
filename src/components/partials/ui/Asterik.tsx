interface IAsterik {
    className?: string
    size?: string
}

const Asterik = ({ className = '', size = "h-[9px]" }: IAsterik) => {

    return (
        <>
            <img src="../../../images/assets/img@asterics.svg" className={`${size} ${className}`} alt="star" />
        </>
    )
};

export default Asterik;
