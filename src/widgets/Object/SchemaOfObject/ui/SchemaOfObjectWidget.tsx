import { Box, Stack, Typography } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import { DeleteFileBtn } from '@/features/File/deleteFile'
import { UploadFileBtn } from '@/features/File/uploadFile'
import { editSchemaFx, uploadImageFx } from '@/features/Object/uploadSchema'
import { TFile } from '@entities/File'
import { $imageOfSchema, reloadSchema } from '@entities/Object'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { MyPaper } from '@shared/ui/Wrappers/MyPaper/MyPaper'

const btnUploadParams = { variant: 'contained', color: 'success' } as const
const btnDeleteParams = { variant: 'outlined', color: 'error' } as const

export const SchemaOfObjectWidget: FC = () => {
    const imageOfSchema = useStore($imageOfSchema)

    const { id } = useDefaultParams()

    const handleUploadImage = (file: TFile) => {
        const data = {
            objectId: id,
            fileIds: [file.id],
        }
        return uploadImageFx({ id, data })
    }
    const handleEditImage = (file: TFile) => {
        const hasId = 'id' in imageOfSchema
        if (!hasId) return

        const data = {
            objectId: id,
            fileIds: [file.id],
            schemaId: imageOfSchema?.id as number,
        }
        return editSchemaFx(data)
    }
    return (
        <MyPaper
            title="Изображение"
            sx={{ minWidth: '600px', mt: 1, maxWidth: '50%' }}
            rightContent={
                <Stack direction={'row'} spacing={2}>
                    {'id' in imageOfSchema ? (
                        <>
                            <UploadFileBtn
                                btnText="Загрузить"
                                btnParams={btnUploadParams}
                                query={handleEditImage}
                            />
                            {!!imageOfSchema?.files?.length && (
                                <DeleteFileBtn
                                    btnText="Удалить"
                                    btnParams={btnDeleteParams}
                                    cb={reloadSchema}
                                    id={imageOfSchema?.files?.[0]?.id as number}
                                />
                            )}
                        </>
                    ) : (
                        <UploadFileBtn
                            btnText="Загрузить"
                            btnParams={btnUploadParams}
                            query={handleUploadImage}
                        />
                    )}
                </Stack>
            }
        >
            {!!imageOfSchema?.files?.length ? (
                <Box
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'center',

                        display: 'flex',
                    }}
                >
                    <img src={imageOfSchema?.files?.[0]?.link}></img>
                </Box>
            ) : (
                <Box
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '50px',
                        display: 'flex',
                    }}
                >
                    <Typography variant="h4">Не загружено</Typography>
                </Box>
            )}
        </MyPaper>
    )
}
