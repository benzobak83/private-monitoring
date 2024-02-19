import { AgreementWithResponsiblePersonWidget } from '@/widgets/Defect/FixMethod/AgreementWithResponseiblePersonsWidget'
import { DefinitionFixMethodByMainEngineerWidget } from '@/widgets/Defect/FixMethod/DefinitionFixMethodByMainEngineerWidget'
import { HeadOfDepartmentStepOneWidget } from '@/widgets/Defect/FixMethod/HeadOfDepartmentStepOneWidget'
import { HeadOfDepartmentStepTwoWidget } from '@/widgets/Defect/FixMethod/HeadOfDepartmentStepTwoWidget'
import { FixMethodStageIds, FixMethodTypeIds } from '@entities/Defect'

export const getCurrentFixMethod = (
    method: FixMethodTypeIds,
    state: FixMethodStageIds
) => {
    switch (method) {
        case FixMethodTypeIds.HIMSELF:
            return null
        case FixMethodTypeIds.CONTRACT:
            return null
        case FixMethodTypeIds.ON_YOUR_OWN_AND_AGREEMENT:
            return state === FixMethodStageIds['ОМУ - нач подразделение'] ? (
                <AgreementWithResponsiblePersonWidget type={'create'} />
            ) : (
                <HeadOfDepartmentStepTwoWidget type={'create'} />
            )
        case FixMethodTypeIds.SUBDIVISION:
            return null
        case FixMethodTypeIds.TRANSFER_TO_HEAD_OF_THE_DEPARTMENT:
            return <HeadOfDepartmentStepOneWidget type={'create'} />
        case FixMethodTypeIds.TRANSFER_TO_ENGINEER:
            return <DefinitionFixMethodByMainEngineerWidget type="create" />
        case FixMethodTypeIds.TERMINATION_OF_EXPLOITATION:
            return null
        case FixMethodTypeIds.BUY_NEW:
            return null

        default:
            break
    }
}
