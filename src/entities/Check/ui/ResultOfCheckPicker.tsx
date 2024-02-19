import { Stack } from '@mui/material'
import { FC, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { TEquipmentStatistics } from '@entities/Equipment'
import { ResultCheckIds } from '../model/types/types'
import { ResultOfCheckRadio } from './ResultOfCheckRadio'

type ResultOfCheckPickerProps = {
    name: string
    defaultValue?: ResultCheckIds
    equipmentStatistics?: TEquipmentStatistics
    isDefect?: boolean
}

export const ResultOfCheckPicker: FC<ResultOfCheckPickerProps> = ({
    name,
    defaultValue,
    isDefect,
    equipmentStatistics,
}) => {
    const { setValue } = useFormContext()

    useEffect(() => {
        setValue(name, defaultValue)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Stack spacing={1}>
            <Stack direction={'row'} spacing={0.5} alignItems="centers">
                {!isDefect && (
                    <ResultOfCheckRadio
                        typeResult={ResultCheckIds.OK}
                        count={equipmentStatistics?.success}
                        name={name}
                    />
                )}
                <ResultOfCheckRadio
                    typeResult={ResultCheckIds.WARNING}
                    count={equipmentStatistics?.warning}
                    name={name}
                />
                <ResultOfCheckRadio
                    typeResult={ResultCheckIds.NEGATIVE}
                    count={equipmentStatistics?.negative}
                    name={name}
                />
            </Stack>
        </Stack>
    )
}
