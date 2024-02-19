import { Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { TErrorMessage } from '@shared/types/Form'

export type TitleFileForUploadingBlockProps = {
    helperText?: TErrorMessage
    hasFilesForUploading: boolean
}

export const TitleFileForUploadingBlock: FC<
    TitleFileForUploadingBlockProps
> = ({ helperText, hasFilesForUploading }) => {
    return (
        <Stack direction="row" spacing={2}>
            <Typography variant="h6">
                {hasFilesForUploading ? 'Файлы к загрузке' : 'Загрузка файлов'}
            </Typography>
            <Typography sx={{ color: 'red' }} variant="h6">
                {helperText as string}
            </Typography>
        </Stack>
    )
}
