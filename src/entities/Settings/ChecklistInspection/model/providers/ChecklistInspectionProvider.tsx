import createFastContext from '@shared/lib/helpers/createFastContext'
import { TChecklistInspection } from '../types'

export const {
    Provider: ChecklistInspectionProvider,
    useStore: useChecklistInspectionStore,
} = createFastContext<TChecklistInspection>({} as TChecklistInspection)
