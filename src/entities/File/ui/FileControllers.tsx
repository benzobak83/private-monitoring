import { Box, Button } from '@mui/material'
import React, { FC } from 'react'
import { useFileBlockStore } from '../model/FileBlockProvider'
import { TFile } from '../model/types'

export type FileControllersProps = {
    disabled?: boolean
    handleFiles: (
        event: React.ChangeEvent<Element>
    ) => Promise<TFile | undefined>
    formId?: string | undefined
}

export const FileControllers: FC<FileControllersProps> = ({
    disabled,
    handleFiles,
    formId,
}) => {
    const [{ filesForUploading }, setFileBlockStore] = useFileBlockStore(
        (store) => store
    )

    const onChange = async (e: React.ChangeEvent) => {
        const file = await handleFiles(e)

        if (!file) return

        setFileBlockStore({ filesForUploading: [...filesForUploading, file] })
    }
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-start',
            }}
        >
            <Button component="label" disabled={disabled}>
                Добавить файл
                <input
                    hidden
                    accept="file/*"
                    type="file"
                    value=""
                    onChange={onChange}
                />
            </Button>
            {formId && !!filesForUploading.length && (
                <Button type="submit" form={formId} disabled={disabled}>
                    сохранить
                </Button>
            )}
        </Box>
    )
}
