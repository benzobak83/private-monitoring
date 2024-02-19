import { FixMethodTypeIds } from '@entities/Defect'
import { HeadOfDepartmentStepTwoFormFields } from '../model/formSchema'
import { MOCK_SUBDIVISION_SERVICE_KEY } from './subdivisionKey'

//бэку "Службу подразделения" требоуется отправлять отдельным булевым значением,
// а не в чекбоксе. Придётся костылить
export const transformedCompleteStageData = (
    data: HeadOfDepartmentStepTwoFormFields
) => {
    const subdivisionKeys = data.subdivisionKeys

    const subdivisionServiceIsPicked = subdivisionKeys?.includes(
        MOCK_SUBDIVISION_SERVICE_KEY
    )

    const filteredData = {
        ...data,
        isMySubdivision: subdivisionServiceIsPicked,
        subdivisionKeys: subdivisionServiceIsPicked
            ? (subdivisionKeys as number[]).filter((item) => {
                  return item !== MOCK_SUBDIVISION_SERVICE_KEY
              })
            : subdivisionKeys,
        method: FixMethodTypeIds.ON_YOUR_OWN_AND_AGREEMENT,
    }

    return filteredData
}
