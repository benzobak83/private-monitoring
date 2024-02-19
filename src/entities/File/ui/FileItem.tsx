import ArticleIcon from '@mui/icons-material/Article'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import {
    Box,
    Button,
    Divider,
    ListItemButton,
    ListItemText,
    Stack,
    Typography,
} from '@mui/material'
import { SxProps, Theme } from '@mui/material'
import { FC } from 'react'
import { formatStringDate } from '@shared/lib/helpers/date/formatStringDate'
import { TFile } from '../model/types'

type FileItemProps = {
    sx?: SxProps<Theme>
    file: TFile
    index: number
    dateFormat: string
    handleDowlandFile?: (id: number) => void
    viewDate: boolean
    onDelete?: (id: number) => void
}

export const FileItem: FC<FileItemProps> = ({
    sx,
    file,
    handleDowlandFile,
    viewDate,
    onDelete,
}) => {
    return (
        <Box sx={sx}>
            <Box
                key={file.id}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <ListItemButton
                    sx={{
                        'word-wrap': 'break-word ',
                        padding: '2px 5px',
                        cursor: 'dowland',
                    }}
                    onClick={() => handleDowlandFile?.(file.id)}
                >
                    <ListItemText
                        primary={
                            <Stack
                                direction={'row'}
                                alignItems="center"
                                spacing={1}
                            >
                                <ArticleIcon color="primary" />
                                <Typography>{file.name}</Typography>
                            </Stack>
                        }
                    />
                </ListItemButton>

                {viewDate && file.uploadedAt && (
                    <>
                        <Divider
                            orientation="vertical"
                            sx={{ height: '20px' }}
                        />

                        <Typography sx={{ padding: '5px' }}>
                            {formatStringDate(file.uploadedAt)}
                        </Typography>
                    </>
                )}

                {onDelete && (
                    <>
                        <Divider
                            orientation="vertical"
                            sx={{ height: '20px' }}
                        />

                        <Button onClick={() => onDelete(file.id)}>
                            <DeleteForeverIcon color="error" />
                        </Button>
                    </>
                )}
            </Box>
        </Box>
    )
}
