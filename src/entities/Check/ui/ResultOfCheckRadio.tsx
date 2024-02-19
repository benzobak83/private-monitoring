import { Box } from '@mui/material'
import { FC } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { hoverOpacitySx } from '@shared/sx'
import { ResultCheckIds } from '../model/types/types'
import { ResultOfCheck } from './ResultOfCheck'

type ResultOfCheckProps = {
    typeResult: ResultCheckIds
    name: string
    count?: number
}

export const ResultOfCheckRadio: FC<ResultOfCheckProps> = ({
    typeResult,
    name,
    count,
}) => {
    const { setValue, control } = useFormContext()

    const value = useWatch({ name, control })

    const handleClick = () => {
        if (value === typeResult) {
            return setValue(name, undefined)
        }
        setValue(name, typeResult)
    }
    return (
        <Box
            onClick={handleClick}
            sx={{ ...hoverOpacitySx, position: 'relative' }}
        >
            <ResultOfCheck typeResult={typeResult} count={count} />
            {typeResult === value && (
                <Box
                    sx={{
                        position: 'absolute',
                        border: '2px solid blue',
                        borderRadius: '20px',
                        padding: '14.5px',
                        left: '1px',
                        top: '1px',
                    }}
                />
            )}
        </Box>
    )
}
