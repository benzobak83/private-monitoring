import { Divider, Stack } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import { DefinitionFixMethodWidget } from '@/widgets/Defect/FixMethod/DefinitionFixMethodWidget'
import { MethodProvider } from '@entities/Defect'
import { $fixMethod, getFixMethodFx } from '@entities/Defect/model/getFixMethod'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { useInit } from '@shared/lib/hooks/useInit'
import { Loader } from '@shared/ui/Loaders/Loader/Loader'
import { TitlePage } from '@shared/ui/TitlePage/TitlePage'
import { getCompletedFixMethod } from '../../lib/getCompletedFixMethod'
import { getCurrentFixMethod } from '../../lib/getCurrentFixMethod'

const FixMethodStage: FC = () => {
    const fixMethod = useStore($fixMethod)
    const getFixMethodFxIsLoading = useStore(getFixMethodFx.pending)

    const { id } = useDefaultParams()

    const { init } = useInit()

    const isDefinitionFixMethod = !fixMethod.length

    const currentFixMethod = fixMethod?.[fixMethod.length - 1]

    if (init && getFixMethodFxIsLoading) {
        return <Loader heightValue={100} />
    }
    return (
        <Stack spacing={1.5}>
            <TitlePage>Определение метода устранения</TitlePage>
            <Divider />
            {isDefinitionFixMethod && (
                <DefinitionFixMethodWidget type={'create'} />
            )}
            {fixMethod.map((method) => {
                return (
                    <MethodProvider method={method} key={method.malfunctionId}>
                        {getCompletedFixMethod(method.method, method.state)}
                    </MethodProvider>
                )
            })}

            {getCurrentFixMethod(
                currentFixMethod?.method,
                currentFixMethod?.state
            )}
        </Stack>
    )
}

export default FixMethodStage
