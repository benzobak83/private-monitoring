import { Button } from '@mui/material'
import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ErrorPopup } from '@shared/ui/ErrorPopup/ErrorPopup'

const ErrorPage: FC = () => {
    const navigate = useNavigate()

    const handleReloadPage = () => {
        navigate('/')
    }

    useEffect(() => {
        localStorage.clear()
    }, [])

    return (
        <ErrorPopup
            title="Произошла непредвиденная ошибка приложения"
            text="Сбросили кэш приложение, попробуйте перезагрузить приложение"
        >
            <Button variant="contained" onClick={handleReloadPage}>
                Перезагрузить приложение
            </Button>
        </ErrorPopup>
    )
}

export default ErrorPage
