import { AgreementWithResponsiblePersonWidget } from '@/widgets/Defect/FixMethod/AgreementWithResponseiblePersonsWidget'
import { DefinitionFixMethodByMainEngineerWidget } from '@/widgets/Defect/FixMethod/DefinitionFixMethodByMainEngineerWidget'
import { DefinitionFixMethodWidget } from '@/widgets/Defect/FixMethod/DefinitionFixMethodWidget'
import { HeadOfDepartmentStepOneWidget } from '@/widgets/Defect/FixMethod/HeadOfDepartmentStepOneWidget'
import { HeadOfDepartmentStepTwoWidget } from '@/widgets/Defect/FixMethod/HeadOfDepartmentStepTwoWidget'
import { FixMethodStageIds, FixMethodTypeIds } from '@entities/Defect'

export const getCompletedFixMethod = (
    method: FixMethodTypeIds,
    state: FixMethodStageIds
) => {
    switch (state) {
        case FixMethodStageIds['ОМУ - ОПО']:
            return <DefinitionFixMethodWidget type={'view'} />

        case FixMethodStageIds['ОМУ - нач подразделение']:
            return <HeadOfDepartmentStepOneWidget type={'view'} />

        case FixMethodStageIds['Согласование с ответственными лицами']:
            return (
                <>
                    <HeadOfDepartmentStepOneWidget type={'view'} />
                    <AgreementWithResponsiblePersonWidget type={'view'} />
                </>
            )

        case FixMethodStageIds['Согласование с начальником подразделения']:
            return (
                <>
                    <HeadOfDepartmentStepOneWidget type={'view'} />
                    <AgreementWithResponsiblePersonWidget type={'view'} />
                    <HeadOfDepartmentStepTwoWidget type={'view'} />
                </>
            )

        case FixMethodStageIds['ОМУ главный инженер']:
            if (method === FixMethodTypeIds.TRANSFER_TO_ENGINEER) {
                return null
            } else {
                return <DefinitionFixMethodByMainEngineerWidget type={'view'} />
            }

        default:
            break
    }
}
