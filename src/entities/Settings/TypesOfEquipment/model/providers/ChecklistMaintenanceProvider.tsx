import createFastContext from '@shared/lib/helpers/createFastContext'
import { TChecklistMaintenance } from '../types'

export const {
    Provider: ChecklistMaintenanceProvider,
    useStore: useChecklistMaintenanceStore,
} = createFastContext<TChecklistMaintenance>({} as TChecklistMaintenance)
