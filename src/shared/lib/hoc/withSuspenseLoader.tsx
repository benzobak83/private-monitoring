import { ReactNode } from 'react'
import { SuspenseLoader } from '../../ui/suspenses/SuspenseLoader'

export const withSuspenseLoader = (Component: ReactNode) => (
    <SuspenseLoader>{Component}</SuspenseLoader>
)
