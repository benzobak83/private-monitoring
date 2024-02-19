import { Divider, Stack, Typography } from '@mui/material'
import { useStore } from 'effector-react'
import { without } from 'lodash'
import React, { FC, memo, useMemo } from 'react'
import { $defect, DefectWorkStageIds } from '@entities/Defect'
import { getForms } from '../lib/getForms'
import { TExecutor, TGetFormsType } from '../model/types'

type PlanningAndCompletingWorkFormProps = {
    stage: DefectWorkStageIds
    executor: TExecutor
    type: TGetFormsType
}
export const PlanningAndCompletingWorkForm: FC<PlanningAndCompletingWorkFormProps> =
    memo(({ stage, executor, type }) => {
        const defect = useStore($defect)

        const forms = useMemo(() => {
            return getForms(stage, executor, type, defect?.stage?.id)
        }, [stage, executor, type, defect.stage])

        return (
            <Stack spacing={1}>
                {without(forms, null).map((form, i) => (
                    <React.Fragment key={Number(form?.stage) + i}>
                        {form?.divider && <Divider flexItem />}
                        {form?.title && (
                            <Typography variant="h5">{form.title}</Typography>
                        )}
                        {form?.component}
                    </React.Fragment>
                ))}
            </Stack>
        )
    })
