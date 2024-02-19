import { Box, Stack, Divider, Typography } from '@mui/material'
import { FC, ReactNode, useCallback, useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { defaultBoxShadowSx } from '@shared/sx'
import { TErrorMessage } from '@shared/types/Form'
import { RequiredSymbol } from '@shared/ui/FormFields/RequiredSymbol/RequiredSymbol'
import { useFileBlockStore } from '../model/FileBlockProvider'
import { getFileIds } from '../model/getFileIds'
import { TFile } from '../model/types'
import { FileList } from './FileList'
import { TitleFileForUploadingBlock } from './TitleFileForUploadingBlock'

export type FileBlockProps = {
    defaultValue: TFile[]
    name: string
    fileControllersSlot: ReactNode
    deleteLoadedFile?: (id: number) => Promise<unknown>
    helperText?: TErrorMessage
    required?: boolean
    formId?: string
}

export const FileBlock: FC<FileBlockProps> = ({
    defaultValue = [],
    name,
    fileControllersSlot,
    deleteLoadedFile,
    helperText,
    required,
}) => {
    const [{ loadedfiles, filesForUploading }, setFileBlockStore] =
        useFileBlockStore((store) => store)

    const { setValue } = useFormContext()

    const onDeleteFilesForUploading = useCallback(
        (id: number) => {
            setFileBlockStore({
                filesForUploading: filesForUploading.filter(
                    (file) => file.id !== id
                ),
            })
        },
        [filesForUploading, setFileBlockStore]
    )

    const onDeleteLoadedFiles = useCallback(
        (id: number) => {
            if (deleteLoadedFile) {
                //если crud - пока удаленно удаляем, потом локально удаляем
                deleteLoadedFile(id).then(() => {
                    setFileBlockStore({
                        loadedfiles: loadedfiles.filter(
                            (file) => file.id !== id
                        ),
                    })
                })
                return
            }

            setFileBlockStore({
                //если не crud - просто локально удаляем
                loadedfiles: filesForUploading.filter((file) => file.id !== id),
            })
        },
        [filesForUploading, setFileBlockStore, deleteLoadedFile, loadedfiles]
    )

    useEffect(() => {
        const fileIds = getFileIds(defaultValue)
        setValue(name, fileIds)
        setFileBlockStore({
            loadedfiles: defaultValue,
            filesForUploading: [],
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValue])

    useEffect(() => {
        const loadedfilesIds = getFileIds(loadedfiles)
        const filesForUploadingIds = getFileIds(filesForUploading)

        setValue(name, [...loadedfilesIds, ...filesForUploadingIds])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadedfiles, filesForUploading])

    const boxSx = useMemo(() => {
        return {
            ...defaultBoxShadowSx,
            padding: '5px 5px',
            borderRadius: '5px',
            position: 'relative',
            border: helperText ? '1px solid red' : null,
        }
    }, [helperText])

    return (
        <Box sx={boxSx}>
            {required && <RequiredSymbol />}
            <Stack>
                <TitleFileForUploadingBlock
                    helperText={helperText}
                    hasFilesForUploading={!!filesForUploading.length}
                />
                <FileList
                    files={filesForUploading}
                    onDelete={onDeleteFilesForUploading}
                    viewDate={false}
                />
            </Stack>
            {fileControllersSlot}
            {!!loadedfiles.length && (
                <Box sx={{ textAlign: 'left' }}>
                    <Divider />
                    <Stack mt={0.3}>
                        <Typography variant="h6">Загруженные файлы:</Typography>
                        <FileList
                            files={loadedfiles}
                            onDelete={onDeleteLoadedFiles}
                        />
                    </Stack>
                </Box>
            )}
        </Box>
    )
}
