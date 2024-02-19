import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Box, IconButton, Stack } from '@mui/material'
import { FC, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { AnswerTypePicker } from '@entities/Settings/ChecklistInspection'
import { StandartTextField } from '@shared/ui/FormFields/StandartTextField/StandartTextField'

type OptionItemProps = {
    name: string
    index: number
    id: string
    error?: boolean
    setOptions: React.Dispatch<React.SetStateAction<string[]>>
}

export const OptionItem: FC<OptionItemProps> = ({
    name,
    index,
    error,
    id,
    setOptions,
}) => {
    const { setValue } = useFormContext()
    const handleDeleteOption = () => {
        setOptions((prev) => prev.filter((option) => option !== id))
    }

    useEffect(() => {
        return () => {
            setValue(`${name}.${index}`, null)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Stack
            direction={'row'}
            spacing={2}
            alignItems={'center'}
            sx={{
                border: error ? '1px solid red' : 'none',
                borderTop: 'none',
                borderRadius: '10px',
            }}
        >
            <Box
                sx={{
                    flexBasis: '70%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                }}
            >
                <IconButton onClick={handleDeleteOption}>
                    <DeleteForeverIcon color="error" />
                </IconButton>
                <StandartTextField
                    label="Название"
                    name={`${name}.${index}.name`}
                    sx={{ flexBasis: '68%' }}
                    //при unmount OptionItem сетается в null, но после этого StandartTextField сетает undefined
                    //этим пропсом отменяем очистку формы у компонента StandartTextField
                    clearFormFieldAfterUnmount={false}
                />
            </Box>
            <Box sx={{ flexBasis: '32%' }}>
                <AnswerTypePicker name={`${name}.${index}.typeAnswer`} />
            </Box>
        </Stack>
    )
}
