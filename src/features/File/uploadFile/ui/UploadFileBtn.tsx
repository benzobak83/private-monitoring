import { ButtonTypeMap } from '@mui/material'
import { FC, useState } from 'react'
import { TFile } from '@entities/File'
import { MyButton } from '@shared/ui/MyButton/MyButton'
import { createFormDataByEvent } from '../lib/createFormDataByEvent'
import { uploadFileFx } from '../model/uploadFile'

type UploadFileBtnProps = {
    btnText: string
    btnParams: Omit<ButtonTypeMap<Record<string, any>, 'button'>['props'], 'sx'>
    query: (file: TFile) => Promise<unknown> | undefined
}

export const UploadFileBtn: FC<UploadFileBtnProps> = ({
    btnText,
    btnParams,
    query,
}) => {
    const [loading, setLoading] = useState<boolean>(false)

    const handleUploadFile = async (e: React.ChangeEvent) => {
        setLoading(true)
        const formData = createFormDataByEvent(e)
        if (!formData) return

        const file = await uploadFileFx({ formData }).then((file) => file)

        if (!file) return

        query(file)?.finally(() => {
            setLoading(false)
        })
    }
    return (
        <MyButton component="label" {...btnParams} isLoading={loading}>
            {btnText}
            <input
                hidden
                accept="file/*"
                type="file"
                value=""
                onChange={handleUploadFile}
            />
        </MyButton>
    )
}
