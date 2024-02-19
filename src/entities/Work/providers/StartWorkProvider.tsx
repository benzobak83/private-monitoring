import createFastContext from '@shared/lib/helpers/createFastContext'
import { TWork } from '../model/types'

export type TStartWorkContext = Pick<
    TWork,
    'isWorkInProgress' | 'object' | 'user'
>

export const { Provider: StartWorkProvider, useStore: useStartWorkStore } =
    createFastContext<TStartWorkContext>({} as TStartWorkContext)
