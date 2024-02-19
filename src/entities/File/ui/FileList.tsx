import { List, Typography } from '@mui/material'
import { SxProps } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { FC } from 'react'
import { TransitionGroup } from 'react-transition-group'
import { dateFormatWithFullTime } from '@shared/lib/consts/date'
import { LoaderWrapper } from '@shared/ui/Wrappers/LoaderWrapper/LoaderWrapper'
import { dowlandFile } from '../lib/dowlandFile'
import { getLinkToFileFx } from '../model/getLinkToFile'
import { TFile } from '../model/types'
import { FileItem } from './FileItem'

export type TFileListProps = {
    files: TFile[]
    onDelete?: (id: number) => void
    dateFormat?: string
    sx?: SxProps
    viewDate?: boolean
    label?: string
    loading?: boolean
    emptyText?: string
}

export const FileList: FC<TFileListProps> = ({
    files,
    viewDate = true,
    dateFormat = dateFormatWithFullTime,
    onDelete,
    loading = false,

    sx,
    label,
}) => {
    const handleDowlandFile = (id: number) => {
        getLinkToFileFx(id).then(({ data }) => dowlandFile(data.data.link))
    }

    return (
        <LoaderWrapper loading={loading}>
            {label && (
                <Typography
                    variant="h6"
                    sx={{ mb: -0.5 }}
                >{`${label}:`}</Typography>
            )}

            <List>
                <TransitionGroup>
                    {files.map((file, i) => {
                        return (
                            <Collapse key={file.id}>
                                <FileItem
                                    index={i}
                                    sx={sx}
                                    file={file}
                                    handleDowlandFile={handleDowlandFile}
                                    dateFormat={dateFormat}
                                    viewDate={viewDate}
                                    onDelete={onDelete}
                                />
                            </Collapse>
                        )
                    })}
                </TransitionGroup>
            </List>
        </LoaderWrapper>
    )
}
