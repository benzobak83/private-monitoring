import { DefectStageIds, FixMethodTypeIds } from '@entities/Defect'
import { TRange } from '@shared/types/Global'

export type TDefectFilter = {
    period: TRange
    result: number
    stage: DefectStageIds
    priority: number
    method: FixMethodTypeIds
    subdivisionId: number
    objectId: number
    equipment: string
    userId: number
    asAgreed: boolean

    //в карточке объекта используется по дефолту
    notFinished: boolean
}
