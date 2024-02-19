import {
    Checkbox,
    Divider,
    FormControlLabel,
    FormGroup,
    Stack,
    Typography,
} from '@mui/material'
import { FC, memo } from 'react'
import { TAnyFunc } from '../../../../shared/types/Global/index'

type TOption = Record<string, unknown> & { id: number }

type StandartCheckBoxViewProps = {
    label?: string
    defaultValue?: Array<number>
    options: TOption[]
    getOptionLabel?: TAnyFunc
    getOptionValue?: TAnyFunc
}

export const StandartCheckBoxView: FC<StandartCheckBoxViewProps> = memo(
    ({
        label,
        defaultValue,
        options,
        getOptionLabel = (option: any) => option.label,
        getOptionValue = (option: any) => option.id,
    }) => {
        const isSelected = (optionId: number) => {
            return defaultValue?.includes(optionId)
        }
        return (
            <FormGroup>
                {label && <Typography variant="h6">{label}</Typography>}
                <Stack divider={<Divider flexItem />}>
                    {options?.map((option) => (
                        <FormControlLabel
                            control={<Checkbox />}
                            checked={isSelected(getOptionValue(option))}
                            label={getOptionLabel(option)}
                            disabled={true}
                            sx={{
                                '.Mui-disabled.MuiTypography-root, .Mui-disabled':
                                    {
                                        color: isSelected(
                                            getOptionValue(option)
                                        )
                                            ? 'black !important'
                                            : 'none',
                                    },
                                '& .MuiSvgIcon-root': {
                                    fontSize: '18px !important',
                                    minWidth: '20px !important',
                                },
                            }}
                            key={option.id}
                        />
                    ))}
                </Stack>
            </FormGroup>
        )
    }
)
