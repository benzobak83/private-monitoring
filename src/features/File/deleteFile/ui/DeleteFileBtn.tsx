import { ButtonTypeMap } from '@mui/material'
import { FC, useState } from 'react'
import { TAnyFunc } from '@shared/types/Global'
import { MyButton } from '@shared/ui/MyButton/MyButton'
import { deleteFileFx } from '../model/deleteFile'

type DeleteFileBtnProps = {
    btnText: string
    btnParams: Omit<ButtonTypeMap<Record<string, any>, 'button'>['props'], 'sx'>
    cb: TAnyFunc
    id: number
}

export const DeleteFileBtn: FC<DeleteFileBtnProps> = ({
    btnText,
    btnParams,
    cb,
    id,
}) => {
    const [loading, setLoading] = useState<boolean>(false)

    const handleDeleteFile = () => {
        setLoading(true)
        deleteFileFx(id)
            .then(() => cb?.())
            .finally(() => {
                setLoading(false)
            })
    }
    return (
        <MyButton
            isLoading={loading}
            component="label"
            {...btnParams}
            onClick={handleDeleteFile}
        >
            {btnText}
        </MyButton>
    )
}
