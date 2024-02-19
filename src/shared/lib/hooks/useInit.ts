import { useEffect, useRef } from 'react'

export const useInit = () => {
    const init = useRef<boolean>(true)

    useEffect(() => {
        queueMicrotask(() => {
            init.current = false
        })
    }, [])

    return { init: init.current }
}
