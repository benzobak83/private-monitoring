import createFastContext from '@shared/lib/helpers/createFastContext'

export const {
    Provider: RegulatoryWorkTableProvider,
    useStore: useRegulatoryWorkTableStore,
} = createFastContext<any>({} as any)
