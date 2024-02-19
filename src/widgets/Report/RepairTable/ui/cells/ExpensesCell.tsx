import { Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { formatNumber } from '@shared/lib/helpers/formatNumber'

type ExpensesCellProps = {
    expenses: string[]
}

export const ExpensesCell: FC<ExpensesCellProps> = ({ expenses }) => {
    return (
        <Stack>
            {expenses.map((item, i) => {
                return (
                    <Typography key={i}>
                        {formatNumber(Number(item))}
                    </Typography>
                )
            })}
        </Stack>
    )
}
