import { FC, ReactNode, createContext, useContext, useMemo } from 'react'
import { TWriteOfMaterials } from '../types/writeOfMaterials'

type WriteOffMaterialsContext = {
    writeOffMaterials: TWriteOfMaterials
}

type WriteOffMaterialsProviderProps = {
    children: ReactNode
    writeOffMaterials: TWriteOfMaterials
}

const WriteOffMaterialsContext = createContext<WriteOffMaterialsContext>(
    {} as WriteOffMaterialsContext
)

export const useWriteOffMaterialsContext = () =>
    useContext(WriteOffMaterialsContext)

export const WriteOffMaterialsProvider: FC<WriteOffMaterialsProviderProps> = ({
    children,
    writeOffMaterials,
}) => {
    const value = useMemo(() => {
        return { writeOffMaterials }
    }, [writeOffMaterials])

    return (
        <WriteOffMaterialsContext.Provider value={value}>
            {children}
        </WriteOffMaterialsContext.Provider>
    )
}
