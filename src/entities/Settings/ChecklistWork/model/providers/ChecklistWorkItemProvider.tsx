import createFastContext from '@shared/lib/helpers/createFastContext'
import { TChecklistItems } from '../types'

export const {
    Provider: ChecklistWorkItemProvider,
    useStore: useChecklistWorkItemStore,
} = createFastContext<TChecklistItems>({} as TChecklistItems)
