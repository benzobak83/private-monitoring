import createFastContext from '@shared/lib/helpers/createFastContext'
import { TSubdivision } from '../types'

export const { Provider: SubdivisionProvider, useStore: useSubdivisionStore } =
    createFastContext<TSubdivision>({} as TSubdivision)
