import createFastContext from '@shared/lib/helpers/createFastContext'
import { TStaff } from '../types'

export const { Provider: StaffProvider, useStore: useStaffStore } =
    createFastContext<TStaff>({} as TStaff)
