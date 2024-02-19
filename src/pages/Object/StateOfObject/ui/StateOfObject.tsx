import { Stack } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, useEffect, useState } from 'react'
import { SwitchHistoryProvider } from '@/features/Check/switchHistory'
import { CheckModel } from '@entities/Check'
import { $objectItem } from '@entities/Object'
import { resetChecklistInspection } from '@entities/Settings/ChecklistInspection'
import { Loader } from '@shared/ui/Loaders/Loader/Loader'
import { HistoryResultOfCheckBlock } from './components/HistoryResultOfCheckBlock'
import { ResultOfCheckBlock } from './components/ResultOfCheckBlock'
import { ResultOfCheckOfHistoryBlock } from './components/ResultOfCheckOfHistoryBlock'

const StateOfObject: FC = () => {
    const object = useStore($objectItem)
    const check = useStore(CheckModel.$check)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (object.check?.id) {
            CheckModel.getCheckFx(object.check?.id).finally(() =>
                setLoading(false)
            )
        } else {
            setLoading(false)
        }

        return () => {
            CheckModel.resetCheck()
            CheckModel.resetCheckOfHistory()
            resetChecklistInspection()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) {
        return <Loader heightValue={100} />
    }

    return (
        <Stack direction="row" spacing={1.5} mt={1}>
            <ResultOfCheckBlock check={check} />
            <SwitchHistoryProvider initId={check?.id}>
                <ResultOfCheckOfHistoryBlock />
                <HistoryResultOfCheckBlock />
            </SwitchHistoryProvider>
        </Stack>
    )
}
export default StateOfObject
