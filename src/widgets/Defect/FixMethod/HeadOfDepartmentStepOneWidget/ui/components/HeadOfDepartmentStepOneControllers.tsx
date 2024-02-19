import { Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { DefineFixMethodBtn } from '@/features/Defect/FixMethod/defineFixMethod'
import { HEAD_OF_DEPARTMENT_STEP_ONE_FORM_IDS } from '../../lib/formIds'

type HeadOfDepartmentStepOneControllersProps = {
    saveAndAgreementIsLoading: boolean
    completeByUnitIsLoading: boolean
}

export const HeadOfDepartmentStepOneControllers: FC<
    HeadOfDepartmentStepOneControllersProps
> = ({ saveAndAgreementIsLoading, completeByUnitIsLoading }) => {
    return (
        <>
            <Stack direction={'row'} spacing={1}>
                <DefineFixMethodBtn
                    formId={
                        HEAD_OF_DEPARTMENT_STEP_ONE_FORM_IDS.saveAndAgreement
                    }
                    modalText="Вы собираетесь сохранить и передать на согласование"
                    btnParams={{ variant: 'contained', color: 'success' }}
                    btnText={
                        <Typography>
                            Сохранить и передать
                            <br />
                            на согласование
                        </Typography>
                    }
                    loading={saveAndAgreementIsLoading}
                />
                <DefineFixMethodBtn
                    formId={HEAD_OF_DEPARTMENT_STEP_ONE_FORM_IDS.completeByUnit}
                    modalText="Вы собираетесь выполнить силами подразделения без согласований"
                    btnParams={{ variant: 'contained' }}
                    btnText={
                        <Typography>
                            Выполнить силами подразделения
                            <br /> без согласований
                        </Typography>
                    }
                    loading={completeByUnitIsLoading}
                />
            </Stack>
        </>
    )
}
