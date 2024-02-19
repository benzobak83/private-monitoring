import { Chip, Stack } from '@mui/material'
import { FC } from 'react'
import { DEFECT_STAGE_OPTIONS } from '../lib/defectStageOptions'
import { DefectStageIds } from '../model/types/types'

type DefectStagesProps = {
    stage: DefectStageIds
}

const getChipParams = (
    idStage: DefectStageIds,
    activeStage: DefectStageIds
) => {
    const isActive = idStage === activeStage
    return {
        color: isActive ? 'success' : 'primary',
        variant: isActive ? 'filled' : 'outlined',
    } as const
}

export const DefectStages: FC<DefectStagesProps> = ({ stage }) => {
    return (
        <Stack direction={'row'} spacing={1}>
            {DEFECT_STAGE_OPTIONS.map((defect) => (
                <Chip
                    key={defect.id}
                    label={defect.label}
                    size="small"
                    {...getChipParams(defect.id, stage)}
                />
            ))}
        </Stack>
    )
}
