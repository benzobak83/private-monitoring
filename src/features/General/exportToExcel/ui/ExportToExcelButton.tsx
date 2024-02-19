import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { ButtonProps, Button } from '@mui/material'
import { FC } from 'react'

type ExportToExcelButtonProps = ButtonProps

export const ExportToExcelButton: FC<ExportToExcelButtonProps> = (...props) => {
    return (
        <Button {...props} variant="outlined" color="success">
            <FileDownloadIcon />
            Экспорт в excel
        </Button>
    )
}
