import { useStore } from 'effector-react'
import { FC, useEffect } from 'react'
import { CompletedCheckOfState } from '@/widgets/Object/CompletedCheckOfState/ui/CompletedCheckOfState'
import { CompleteInspectionForm } from '@/features/Check/completeCheck'
import { CheckModel, StateCheckIds, TCheck } from '@entities/Check'
import { reloadObjectItem } from '@entities/Object'
import {
    $checklistInspection,
    getChecklistInspection,
} from '@entities/Settings/ChecklistInspection'
import { withDefaultTableParams } from '@shared/lib/helpers/withDefaultTableParams'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { BlockWrapper } from './BlockWrapper'

type ResultOfCheckBlockProps = {
    check: TCheck | null
}

export const ResultOfCheckBlock: FC<ResultOfCheckBlockProps> = ({ check }) => {
    const checklistInspection = useStore($checklistInspection)
    const getChecklistInspectionIsLoading = useStore(
        getChecklistInspection.pending
    )
    const getCheckFxIsLoading = useStore(CheckModel.getCheckFx.pending)

    const { id } = useDefaultParams()

    const cbAfterComplete = () => {
        reloadObjectItem()
        CheckModel.getHistoryTableDataFx(
            withDefaultTableParams({ objectId: id })
        )
    }

    useEffect(() => {
        if (!check?.checklistId) return

        getChecklistInspection(check.checklistId)
    }, [check?.checklistId])
    return (
        <BlockWrapper
            title="Чеклист проверки состояния помещения (внешний осмотр)"
            loading={getCheckFxIsLoading || getChecklistInspectionIsLoading}
        >
            {check?.state?.id === StateCheckIds.NEW ? (
                <CompleteInspectionForm
                    checkId={check.id}
                    checklistInspection={checklistInspection}
                    cbAfterComplete={cbAfterComplete}
                />
            ) : (
                <CompletedCheckOfState check={check} />
            )}
        </BlockWrapper>
    )
}
