import { Stack } from '@mui/material'
import { useStore } from 'effector-react'
import { useMemo } from 'react'
import { $defect, useMethodContext } from '@entities/Defect'
import { TypeManager } from '@entities/Dict'
import { FileList } from '@entities/File'
import {
    $officialsTableData,
    TOfficial,
    getResponsiblePersonsByKeys,
} from '@entities/Settings/Officials'
import { StandartCheckBoxView } from '@shared/ui/FormFields/StandartCheckBox/StandartCheckBoxView'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'

const RESPONSIBLE_PERSON_KEYS = [
    TypeManager.MECHANIC,
    TypeManager.POWER_ENGINEER,
    TypeManager.BOSS,
]

export const HeadOfDepartmentStepOneView = () => {
    const officialsTableData = useStore($officialsTableData)
    const defect = useStore($defect)

    const { method } = useMethodContext()

    const RESPONSIBLE_PERSONS = useMemo(() => {
        return getResponsiblePersonsByKeys(
            officialsTableData.rows,
            RESPONSIBLE_PERSON_KEYS
        )
    }, [officialsTableData.rows])

    return (
        <Stack spacing={1}>
            <ViewFieldPrimitiveValue
                label="Начальник подразделения"
                value={defect?.subdivision?.user?.name}
            />
            <ViewFieldPrimitiveValue
                label="Описание неисправности"
                value={method.comment}
            />
            <FileList label="Приложения" files={method.files} />
            <ViewFieldPrimitiveValue
                label="Стоимость выполнения силами подразделения"
                value={method.sum}
                emptyText="не можем"
                isRub
            />

            <Stack spacing={1}>
                <StandartCheckBoxView
                    label="Согласовать с:"
                    options={RESPONSIBLE_PERSONS}
                    getOptionLabel={(option: TOfficial) =>
                        `${option.name} - ${option.users?.[0]?.name}`
                    }
                    getOptionValue={(option: TOfficial) => option.key}
                    defaultValue={method?.agreement?.map((item) => item?.key)}
                />
                {/* {OPTIONS.map((option) => (
                        <AgreementApprovalOption
                            label={option.label}
                            active={option.id === 2}
                            key={option.id}
                        />
                    ))} */}
            </Stack>
        </Stack>
    )
}
