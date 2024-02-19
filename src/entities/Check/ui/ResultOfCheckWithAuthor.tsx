import { Theme } from '@emotion/react'
import LensIcon from '@mui/icons-material/Lens'
import { Stack, Typography, Box, SxProps } from '@mui/material'
import { FC } from 'react'
import { useCheckResultByIdFromDict } from '@entities/Dict'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'
import { MyPaper } from '@shared/ui/Wrappers/MyPaper/MyPaper'
import { getColorByResult } from '../lib/getColorByResult'
import { ResultCheckIds } from '../model/types/types'

type ResultOfCheckWithAuthorProps = {
    user?: string
    result: ResultCheckIds
    sx?: SxProps<Theme>
}

export const ResultOfCheckWithAuthor: FC<ResultOfCheckWithAuthorProps> = ({
    user,
    result,
    sx,
}) => {
    const checkResult = useCheckResultByIdFromDict(result)
    console.log('result - ', result)
    console.log('checkResult - ', checkResult)

    return (
        <MyPaper sx={sx}>
            <Stack direction="row" spacing={1}>
                {result && (
                    <LensIcon
                        color={getColorByResult(result)}
                        fontSize="large"
                    />
                )}
                <Stack>
                    <ViewFieldPrimitiveValue
                        label="Результат проверки"
                        value={checkResult?.name}
                        row={false}
                    />
                    {user && (
                        <Box>
                            <Typography>{user}</Typography>
                        </Box>
                    )}
                </Stack>
            </Stack>
        </MyPaper>
    )
}
