import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@shared/lib/consts/routes'

const MainRedirecter: FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate(ROUTES.work.general)
    }, [navigate])

    return <></>
}

export default MainRedirecter
