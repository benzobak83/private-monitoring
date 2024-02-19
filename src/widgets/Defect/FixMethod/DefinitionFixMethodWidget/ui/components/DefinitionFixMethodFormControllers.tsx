import { Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { DefineFixMethodBtn } from '@/features/Defect/FixMethod/defineFixMethod'
import { DEFINITION_FIX_METHOD_FORM_IDS } from '../../lib/formIds'

type DefinitionFixMethodFormControllersProps = {
    fixDefectByHimselfIsLoading: boolean
    canNotFixDefectByHimselfIsLoading: boolean
}

export const DefinitionFixMethodFormControllers: FC<
    DefinitionFixMethodFormControllersProps
> = ({ fixDefectByHimselfIsLoading, canNotFixDefectByHimselfIsLoading }) => {
    return (
        <Stack direction={'row'} spacing={2} mt={1}>
            <DefineFixMethodBtn
                formId={DEFINITION_FIX_METHOD_FORM_IDS.fixDefectByHimself}
                modalText="Вы собираетесь устранить дефект самостоятельно"
                btnParams={{ variant: 'contained' }}
                btnText="Устраню самостоятельно"
                loading={fixDefectByHimselfIsLoading}
            />
            <DefineFixMethodBtn
                formId={DEFINITION_FIX_METHOD_FORM_IDS.canNotFixDefectByHimself}
                modalText="Вы собираетесь передать работу начальнику подразделения"
                btnParams={{ variant: 'contained', color: 'warning' }}
                btnText={
                    <Typography>
                        Самостоятельно устранить не смогу. <br /> Передать
                        начальнику подразделения
                    </Typography>
                }
                loading={canNotFixDefectByHimselfIsLoading}
            />
        </Stack>
    )
}
