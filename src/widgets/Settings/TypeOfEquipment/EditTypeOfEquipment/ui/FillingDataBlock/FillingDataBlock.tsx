import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import { ChecklistTypeControl } from '@entities/Settings/Checklist'
import { warningColor } from '@shared/styles/variables/_export.module.scss'
import { EditTypeOfEquipmentFormFields } from '../../model/formSchema'
import { TNamespace } from '../../model/types'
import { DateData } from '../DateData/DateData'
import { MilageData } from '../MilageData/MilageData'

type FillingDataBlockProps = {
    namespace: TNamespace
}

export const FillingDataBlock: FC<FillingDataBlockProps> = ({ namespace }) => {
    const { watch } = useFormContext<EditTypeOfEquipmentFormFields>()

    const isRegular = watch(`${namespace}.isRegular`)
    const typeControl = watch(`${namespace}.typeControl`)

    //Разовая, по дате
    if (!isRegular && typeControl === ChecklistTypeControl.DATE) {
        return <DateData namespace={namespace} isRegulary={false} />
    }

    //Разовая, по пробегу
    if (!isRegular && typeControl === ChecklistTypeControl.MILAGE) {
        return <MilageData namespace={namespace} isRegulary={false} />
    }

    //Регулярная, по дате
    if (isRegular && typeControl === ChecklistTypeControl.DATE) {
        return <DateData namespace={namespace} isRegulary />
    }

    //Регулярная, по пробегу
    if (isRegular && typeControl === ChecklistTypeControl.MILAGE) {
        return <MilageData namespace={namespace} isRegulary={true} />
    }

    return (
        <Box textAlign="center">
            <Typography color={warningColor}>
                Выберите метод и тип проверки для указания следующих данных
            </Typography>
        </Box>
    )
}
