import { Stack, Box } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import { StartInspectionButton } from '@/features/Check/startInspection'
import { CheckModel, ResultOfCheckWithAuthor, TCheck } from '@entities/Check'
import { $objectItem } from '@entities/Object'
import { withDefaultTableParams } from '@shared/lib/helpers/withDefaultTableParams'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'

type CompletedCheckOfState = {
    check: TCheck | undefined | null
}

export const CompletedCheckOfState: FC<CompletedCheckOfState> = ({ check }) => {
    const object = useStore($objectItem)

    const { id } = useDefaultParams()

    const data = { objectId: object?.id, checklistId: object?.checklist?.id }

    const reloadHistoryTableData = () =>
        CheckModel.getHistoryTableDataFx(
            withDefaultTableParams({ objectId: id })
        )

    if (!Object.keys(check || {}).length)
        return (
            <Box
                sx={{
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <StartInspectionButton
                    btnText="Начать осмотр"
                    data={data}
                    reloadPage={reloadHistoryTableData}
                />
            </Box>
        )
    return (
        <Box>
            <Stack spacing={1}>
                <ViewFieldPrimitiveValue
                    label="Повторять проверку через"
                    value={check?.description}
                />
                <ViewFieldPrimitiveValue
                    label="Последняя пройденная проверка"
                    value={check?.lastCheck}
                />
                <ViewFieldPrimitiveValue
                    label="Комментарий"
                    value={check?.comment}
                />
            </Stack>
            <Stack mt={2} spacing={2}>
                {check?.result?.id && (
                    <ResultOfCheckWithAuthor
                        user={check?.user.name}
                        result={check?.result?.id}
                    />
                )}
                <StartInspectionButton
                    btnText="Провести осмотр заново"
                    data={data}
                    reloadPage={reloadHistoryTableData}
                />
            </Stack>
        </Box>
    )
}
