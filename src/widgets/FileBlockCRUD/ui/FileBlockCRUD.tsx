import useId from '@mui/material/utils/useId'
import { FC, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { deleteFileFx } from '@/features/File/deleteFile'
import { createFormDataByEvent, uploadFileFx } from '@/features/File/uploadFile'
import {
    FileBlock,
    FileBlockProps,
    FileBlockProvider,
    FileControllers,
} from '@entities/File'
import { emitErrorLog, MESSAGES_FOR_LOG } from '@shared/notification'
import { LoaderWrapper } from '@shared/ui/Wrappers/LoaderWrapper/LoaderWrapper'

export const FileBlockCRUD: FC<
    Omit<FileBlockProps, 'fileControllersSlot'> & {
        queryForUpload: (...args: any) => Promise<unknown>
    }
> = ({ defaultValue = [], name, queryForUpload }) => {
    const [loading, setLoading] = useState<boolean>(false)

    const formMethods = useForm()
    const { handleSubmit } = formMethods

    const formId = useId()

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

    const onSubmit = (data: Record<string, number[]>) => {
        setLoading(true)

        queryForUpload(data)
            .catch((e) => {
                emitErrorLog(e, MESSAGES_FOR_LOG.error.file.upload)
            })
            .finally(() => setLoading(false))
    }

    return (
        <LoaderWrapper loading={loading}>
            <FormProvider {...formMethods}>
                <form id={formId} onSubmit={handleSubmit(onSubmit)}></form>
                <FileBlockProvider>
                    <FileBlock
                        defaultValue={defaultValue}
                        name={name}
                        deleteLoadedFile={(id: number) => deleteFileFx(id)}
                        fileControllersSlot={
                            <FileControllers
                                handleFiles={handleUploadFile}
                                formId={formId}
                            />
                        }
                    />
                </FileBlockProvider>
            </FormProvider>
        </LoaderWrapper>
    )
}
