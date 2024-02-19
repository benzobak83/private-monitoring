import { Card, Stack, Typography, SxProps, Theme } from '@mui/material'
import { FC } from 'react'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'

type RejectedBlockProps = {
    fullName: string
    date: string
    msg: string
    sum?: string
    sx?: SxProps<Theme>
}

export const RejectedBlock: FC<RejectedBlockProps> = ({
    fullName,
    date,
    sum,
    msg,
    sx,
}) => {
    return (
        <Card sx={{ padding: '8px', bgcolor: '#ffc6c4', ...sx }}>
            <Stack spacing={0.5}>
                <Typography variant="h4">
                    Отклонено ОПП - {fullName} - {date}
                </Typography>
                {sum && (
                    <ViewFieldPrimitiveValue
                        label="Указанный лимит"
                        value={sum}
                    />
                )}
                <ViewFieldPrimitiveValue label="Комментарий" value={msg} />
            </Stack>
        </Card>
    )
}
