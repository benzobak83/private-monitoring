import { FC, ReactNode, createContext, useContext, useMemo } from 'react'
import { TFixMethod } from '../types/fixMethod'

type MethodContext = {
    method: TFixMethod
}

type MethodProviderProps = {
    children: ReactNode
    method: TFixMethod
}

const MethodContext = createContext<MethodContext>({} as MethodContext)

export const useMethodContext = () => useContext(MethodContext)

export const MethodProvider: FC<MethodProviderProps> = ({
    children,
    method,
}) => {
    const value = useMemo(() => {
        return { method }
    }, [method])

    return (
        <MethodContext.Provider value={value}>
            {children}
        </MethodContext.Provider>
    )
}
