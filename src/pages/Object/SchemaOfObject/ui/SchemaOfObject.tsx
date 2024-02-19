import { Stack } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, useEffect } from 'react'
import { FileBlockCRUD } from '@/widgets/FileBlockCRUD'
import { SchemaOfObjectWidget } from '@/widgets/Object/SchemaOfObject'
import {
    TUploadFileReq,
    editSchemaFx,
    uploadFileFx,
} from '@/features/Object/uploadSchema'
import { $filesOfSchema, getSchemaFx } from '@entities/Object'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { MyPaper } from '@shared/ui/Wrappers/MyPaper/MyPaper'

const SchemaOfObject: FC = () => {
    const filesOfSchema = useStore($filesOfSchema)

    const { id } = useDefaultParams()

    const handleUploadFile = (data: { fileIds: number[] }) => {
        const filteredData: TUploadFileReq = {
            ...data,
            objectId: id,
        }
        return uploadFileFx({ data: filteredData, id })
    }
    const handleEditFile = (data: { fileIds: number[] }) => {
        const filteredData = {
            ...data,
            objectId: id,
            schemaId: filesOfSchema.id,
        }
        return editSchemaFx(filteredData)
    }

    useEffect(() => {
        getSchemaFx(id)
    }, [id])

    return (
        <Stack direction="row" spacing={2} alignItems="flex-start" mt={1}>
            <SchemaOfObjectWidget />
            <MyPaper title="Документация" sx={{ width: '500px' }}>
                <FileBlockCRUD
                    name="fileIds"
                    defaultValue={filesOfSchema.files}
                    queryForUpload={
                        filesOfSchema.id ? handleEditFile : handleUploadFile
                    }
                />
            </MyPaper>
        </Stack>
    )
}
export default SchemaOfObject
