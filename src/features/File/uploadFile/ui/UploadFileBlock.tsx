import { Stack, Typography } from '@mui/material'
import React, { FC, useState } from 'react'
import { FileBlockProps } from '@entities/File'
import { FileBlockProvider } from '@entities/File/model/FileBlockProvider'
import { FileBlock } from '@entities/File/ui/FileBlock'
import { FileControllers } from '@entities/File/ui/FileControllers'
import { LoaderWrapper } from '@shared/ui/Wrappers/LoaderWrapper/LoaderWrapper'
import { createFormDataByEvent } from '../lib/createFormDataByEvent'
import { uploadFileFx } from '../model/uploadFile'

type UploadFileBlockProps = Omit<FileBlockProps, 'fileControllersSlot'> & {
    label?: string
}

export const UploadFileBlock: FC<UploadFileBlockProps> = ({
    defaultValue,
    name,
    label,
    helperText,
    formId,
}) => {
    const [loading, setLoading] = useState<boolean>(false)

    const handleUploadFile = async (e: React.ChangeEvent) => {
        setLoading(true)
        const formData = createFormDataByEvent(e)
        if (!formData) return

        return uploadFileFx({ formData })
            .then((file) => file)
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <LoaderWrapper loading={loading}>
            <FileBlockProvider>
                <Stack spacing={1}>
                    {label && <Typography variant="h6">{label}:</Typography>}
                    <FileBlock
                        defaultValue={defaultValue}
                        name={name}
                        helperText={helperText}
                        fileControllersSlot={
                            <FileControllers
                                handleFiles={handleUploadFile}
                                formId={formId}
                            />
                        }
                    />
                </Stack>
            </FileBlockProvider>
        </LoaderWrapper>
    )
}
