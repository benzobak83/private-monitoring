import { useParams } from 'react-router-dom'

export type TDefaultParams = {
    id: number
}

export const useDefaultParams = () => {
    const { id } = useParams()

    return { id: Number(id) } as TDefaultParams
}
