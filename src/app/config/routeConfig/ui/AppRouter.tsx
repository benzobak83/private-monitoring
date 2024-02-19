import { FC, memo } from 'react'
import { RouterProvider } from 'react-router-dom'
import { DictWrapper } from '@entities/Dict'
import { OfficialsWrapper } from '@entities/Settings/Officials'
import { WorkWrapper } from '@entities/Work'
import { AuthWrapper } from '../../../wrappers/AuthWrapper'
import { routeConfig } from '../model/routeConfig'

export const AppRouter: FC = memo(() => {
    return (
        <AuthWrapper>
            <DictWrapper>
                <WorkWrapper>
                    <OfficialsWrapper>
                        <RouterProvider router={routeConfig} />
                    </OfficialsWrapper>
                </WorkWrapper>
            </DictWrapper>
        </AuthWrapper>
    )
})
