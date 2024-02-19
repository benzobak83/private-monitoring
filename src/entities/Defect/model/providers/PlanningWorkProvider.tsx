import { FC, ReactNode, createContext, useContext, useMemo } from 'react'
import { TPlanningWork } from '../types/planningWork'

type PlanningWorkContext = {
    planningWork: TPlanningWork
}

type PlanningWorkProviderProps = {
    children: ReactNode
    planningWork: TPlanningWork
}

const PlanningWorkContext = createContext<PlanningWorkContext>(
    {} as PlanningWorkContext
)

export const usePlanningWorkContext = () => useContext(PlanningWorkContext)

export const PlanningWorkProvider: FC<PlanningWorkProviderProps> = ({
    children,
    planningWork,
}) => {
    const value = useMemo(() => {
        return { planningWork }
    }, [planningWork])

    return (
        <PlanningWorkContext.Provider value={value}>
            {children}
        </PlanningWorkContext.Provider>
    )
}
