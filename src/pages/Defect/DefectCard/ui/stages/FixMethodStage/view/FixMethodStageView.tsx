import { Stack } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import { FixMethodStageIds, MethodProvider } from '@entities/Defect'
import { $fixMethod, $fixMethodLast } from '@entities/Defect/model/getFixMethod'
import { MyPaper } from '@shared/ui/Wrappers/MyPaper/MyPaper'
import { getCompletedFixMethod } from '../../../lib/getCompletedFixMethod'

const FixMethodStageView: FC = () => {
    const fixMethod = useStore($fixMethod)
    const fixMethodLast = useStore($fixMethodLast)

    const wasPickByEngineer =
        fixMethodLast.state === FixMethodStageIds['ОМУ главный инженер']
    return (
        <MyPaper
            accordion={!wasPickByEngineer}
            title="Определение метода устранения"
            borderRadius={false}
        >
            <Stack spacing={1.5}>
                {fixMethod.map((method) => {
                    return (
                        <MethodProvider
                            method={method}
                            key={method.malfunctionId}
                        >
                            {getCompletedFixMethod(method.method, method.state)}
                        </MethodProvider>
                    )
                })}
            </Stack>
        </MyPaper>
    )
}

export default FixMethodStageView
