import {
    FC,
    ReactNode,
    createContext,
    useContext,
    useMemo,
    useState,
} from 'react'

type SwitchHistoryContext = {
    historyId: number | undefined
    setHistoryId: any
}

type SwitchHistoryProviderProps = {
    children: ReactNode
    initId: number | undefined
}

export const SwitchHistoryContext = createContext<SwitchHistoryContext>(
    {} as SwitchHistoryContext
)

export const useSwitchHistoryContext = () => useContext(SwitchHistoryContext)

export const SwitchHistoryProvider: FC<SwitchHistoryProviderProps> = ({
    children,
    initId,
}) => {
    const [historyId, setHistoryId] = useState(initId)

    const value = useMemo(() => {
        return { historyId, setHistoryId }
    }, [historyId, setHistoryId])

    return (
        <SwitchHistoryContext.Provider value={value}>
            {children}
        </SwitchHistoryContext.Provider>
    )
}
