import { TGetFormsType } from '@/widgets/Defect/PlanningAndCompletingWorkWidget/model/types'
import { PlanningAndCompletingWorkWidget } from '@/widgets/Defect/PlanningAndCompletingWorkWidget/ui/PlanningAndCompletingWorkWidget'
import { FixMethodTypeIds } from '@entities/Defect'

export const getWorkWidget = (
    method: FixMethodTypeIds,
    type: TGetFormsType
) => {
    switch (method) {
        case FixMethodTypeIds.HIMSELF:
        case FixMethodTypeIds.TERMINATION_OF_EXPLOITATION:
            return (
                <PlanningAndCompletingWorkWidget
                    executor="himself"
                    type={type}
                />
            )
        case FixMethodTypeIds.CONTRACT:
            return (
                <PlanningAndCompletingWorkWidget
                    executor="contract"
                    type={type}
                />
            )
        case FixMethodTypeIds.ON_YOUR_OWN_AND_AGREEMENT:
        case FixMethodTypeIds.SUBDIVISION:
            return (
                <PlanningAndCompletingWorkWidget
                    executor="ownPower"
                    type={type}
                />
            )
        default:
            break
    }
}
