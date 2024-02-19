import { FC, ReactNode, createContext, useContext, useMemo } from 'react'
import { TCompletingWork } from '../types/completingWork'

type CompletingWorkContext = {
    completingWork: TCompletingWork
}

type CompletingWorkProviderProps = {
    children: ReactNode
    completingWork: TCompletingWork
}

const CompletingWorkContext = createContext<CompletingWorkContext>(
    {} as CompletingWorkContext
)

export const useCompletingWorkContext = () => useContext(CompletingWorkContext)

export const CompletingWorkProvider: FC<CompletingWorkProviderProps> = ({
    children,
    completingWork,
}) => {
    const value = useMemo(() => {
        return { completingWork }
    }, [completingWork])

    return (
        <CompletingWorkContext.Provider value={value}>
            {children}
        </CompletingWorkContext.Provider>
    )
}
