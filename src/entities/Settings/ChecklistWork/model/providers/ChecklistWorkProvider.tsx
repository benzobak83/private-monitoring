import createFastContext from '@shared/lib/helpers/createFastContext'
import { TChecklistWork } from '../types'

export const {
    Provider: ChecklistWorkProvider,
    useStore: useChecklistWorkStore,
} = createFastContext<TChecklistWork>({} as TChecklistWork)
