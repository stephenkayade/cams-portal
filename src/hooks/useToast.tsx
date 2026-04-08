import useContextType from './useContextType'

const useToast = () => {

    const { userContext } = useContextType()
    const {
        toast,
        setToast,
        clearToast
    } = userContext

    return {
        toast,
        setToast,
        clearToast
    }
}

export default useToast