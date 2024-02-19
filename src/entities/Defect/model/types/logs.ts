import { TIdWithName } from '@shared/types/Global'
import { DefectStageIds } from './types'

export type TLog = {
    logs: {
        action: string
        createdAt: string
        id: number
        modelClass: string
        modelId: number
        new_value: {
            uuid: string
            stage: DefectStageIds
            user_id: number
            check_id: number
            updated_at: string
            createdAt: string
            id: number
        }
        previous_value: {
            uuid: string
            stage: DefectStageIds
            user_id: number
            check_id: number
            updated_at: string
            createdAt: string
            id: number
        }
        user: TIdWithName
    }[]
    stage: { id: DefectStageIds; name: string }
}
