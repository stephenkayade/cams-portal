import { useCallback, useEffect } from 'react'

const useNetwork = (trigger: boolean = true) => {

    const popNetwork = useCallback(() => {
        window.location.href = '/no-network'
    }, [])

    const toggleNetwork = useCallback((e: any) => {
        popNetwork()
    }, [popNetwork])

    useEffect(() => {

        if (trigger) {
            window.addEventListener(`offline`, toggleNetwork, false);
            window.addEventListener(`online`, () => { }, false);
        }

        return () => {
            window.removeEventListener('offline', toggleNetwork, false);
        }

    }, [toggleNetwork, trigger])

    return { popNetwork }

}

export default useNetwork
