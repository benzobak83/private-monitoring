import {
    Radio,
    Divider,
    FormControlLabel,
    FormGroup,
    Stack,
    Typography,
    Theme,
    SxProps,
} from '@mui/material'
import { FC, memo } from 'react'
import { TAnyFunc } from '../../../../shared/types/Global/index'

type TOption = Record<string, unknown> & { id: number }
type TLabelType = 'light' | 'bold'

type StandartRadioViewProps = {
    label?: string
    defaultValue?: string | number | null | boolean | undefined
    options: TOption[]
    labelType?: 'light' | 'bold'
    sx?: SxProps<Theme>
    getOptionLabel?: TAnyFunc
}

const getLabelParams = (labelType: TLabelType) => {
    if (labelType === 'bold') {
        return { variant: 'h6' } as const
    }
    if (labelType === 'light') {
        return { color: 'rgba(0, 0, 0, 0.6);' } as const
    }
}

export const StandartRadioView: FC<StandartRadioViewProps> = memo(
    ({
        label,
        labelType = 'bold',
        defaultValue,
        options,
        sx,
        getOptionLabel = (option: any) => option.label,
    }) => {
        return (
            <FormGroup sx={sx}>
                {label && (
                    <Typography {...getLabelParams(labelType)}>
                        {label}
                    </Typography>
                )}
                <Stack divider={<Divider flexItem />}>
                    {options?.map((option) => {
                        const isSelected = option.id === defaultValue

                        return (
                            <FormControlLabel
                                control={<Radio />}
                                checked={isSelected}
                                label={getOptionLabel(option)}
                                disabled={true}
                                sx={{
                                    '.Mui-disabled.MuiTypography-root, .Mui-disabled':
                                        {
                                            color: isSelected
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
                        )
                    })}
                </Stack>
            </FormGroup>
        )
    }
)
