import { Stack, Typography } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import {
    DefineFixMethodBtn,
    defineFixMethodFx,
} from '@/features/Defect/FixMethod/defineFixMethod'
import { goToPlanningWorkFx } from '@/features/Defect/FixMethod/goToPlanningWork'
import { HEAD_OF_DEPARTMENT_STEP_TWO_FORM_IDS } from '../../lib/formIds'

export const HeadOfDepartmentStepTwoFormControllers: FC = () => {
    const goToPlanningWorkFxIsLoading = useStore(goToPlanningWorkFx.pending)
    const defineFixMethodFxIsLoading = useStore(defineFixMethodFx.pending)
    return (
        <Stack direction={'row'} spacing={2}>
            <DefineFixMethodBtn
                formId={HEAD_OF_DEPARTMENT_STEP_TWO_FORM_IDS.completeStage}
                modalText='Вы собираетесь завершить стадию "Определение метода устранения"'
                btnParams={{ variant: 'contained', color: 'success' }}
                btnText={
                    <Typography>
                        Завершить стадию определения <br /> метода устранения
                    </Typography>
                }
                loading={goToPlanningWorkFxIsLoading}
            />
            <DefineFixMethodBtn
                formId={
                    HEAD_OF_DEPARTMENT_STEP_TWO_FORM_IDS.transferToEngineerWithoutAgreement
                }
                modalText="Вы собираетесь передать работу главному инженеру, не согласовав"
                btnParams={{ variant: 'contained', color: 'error' }}
                btnText={
                    <Typography>
                        Не согласовано, передать <br /> главному инженеру
                    </Typography>
                }
                loading={defineFixMethodFxIsLoading}
            />
        </Stack>
    )
}
