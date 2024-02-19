import { Stack, Typography } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, useMemo } from 'react'
import { useMethodContext } from '@entities/Defect'
import { $fixMethodLast } from '@entities/Defect/model/getFixMethod'
import {
    $officialsTableData,
    TOfficial,
    getResponsiblePersonsByKeys,
} from '@entities/Settings/Officials'
import { StandartCheckBoxView } from '@shared/ui/FormFields/StandartCheckBox/StandartCheckBoxView'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'

export const HeadOfDepartmentStepTwoView: FC = () => {
    const officialsTableData = useStore($officialsTableData)
    const fixMethodLast = useStore($fixMethodLast)

    const { method } = useMethodContext()

    const RESPONSIBLE_PERSON_KEYS = useMemo(() => {
        return fixMethodLast?.agreement?.map((item) => item.key)
    }, [fixMethodLast])

    const RESPONSIBLE_PERSONS = useMemo(() => {
        return getResponsiblePersonsByKeys(
            officialsTableData.rows,
            RESPONSIBLE_PERSON_KEYS
        )
    }, [officialsTableData.rows, RESPONSIBLE_PERSON_KEYS])
    return (
        <Stack spacing={1}>
            <ViewFieldPrimitiveValue
                label="Начальник подразделения"
                value={'Иванов И.И.'}
            />

            <Stack spacing={1}>
                {!!RESPONSIBLE_PERSONS.length && (
                    <>
                        <Typography variant="h6">
                            Работы будут выполнять:
                        </Typography>

                        <StandartCheckBoxView
                            options={RESPONSIBLE_PERSONS}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option: TOfficial) => option.key}
                            defaultValue={method?.agreement?.map(
                                (item) => item?.key
                            )}
                        />
                    </>
                )}
            </Stack>
        </Stack>
    )
}
