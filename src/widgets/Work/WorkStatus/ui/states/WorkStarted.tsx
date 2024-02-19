import { Stack } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import { CompleteWorkBtn } from '@/features/Work/completeWork'
import { $currentWork } from '@entities/Work/model/getCurrentWork'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'
import { MyPaper } from '@shared/ui/Wrappers/MyPaper/MyPaper'

export const WorkStarted: FC = () => {
    const work = useStore($currentWork)
    return (
        <MyPaper>
            <Stack direction={'row'} alignItems={'center'} spacing={2}>
                <ViewFieldPrimitiveValue
                    label="Текущая смена"
                    value={work?.object?.name}
                />
                <ViewFieldPrimitiveValue
                    label="Начало"
                    value={work.dateStart}
                />
                <ViewFieldPrimitiveValue
                    label="Продолжительность"
                    value={work.duration}
                />
                <CompleteWorkBtn work={work} />
            </Stack>
        </MyPaper>
    )
}
