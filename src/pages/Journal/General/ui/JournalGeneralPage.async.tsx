import { lazy } from 'react'

export const JournalGeneralPageAsync = lazy(
    () => import('./JournalGeneralPage')
)
