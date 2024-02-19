import createFastContext from '@shared/lib/helpers/createFastContext'
import { TChecklistItems } from '../types'

export const {
    Provider: ChecklistInspectionItemProvider,
    useStore: useChecklistInspectionItemStore,
} = createFastContext<TChecklistItems>({} as TChecklistItems)
