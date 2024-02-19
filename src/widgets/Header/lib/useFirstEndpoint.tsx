import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const useFirstEndpoint = () => {
    const { pathname } = useLocation()
    const [endpoint, setEndpoint] = useState<string>('')

    useEffect(() => {
        const endpoints = pathname.split('/')

        if (endpoints.length < 1) return

        const firstEndpoint = endpoints[1]

        setEndpoint('/' + firstEndpoint)
    }, [pathname])

    return endpoint
}
