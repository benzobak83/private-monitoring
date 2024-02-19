import { Stack, Button } from '@mui/material'
import { FC } from 'react'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'
type StartRegulatoryWorkFormProps = {
    regulatoryWork: any
}

export const StartRegulatoryWorkForm: FC<StartRegulatoryWorkFormProps> = ({
    regulatoryWork,
}) => {
    return (
        <Stack spacing={2}>
            <Stack spacing={1}>
                <ViewFieldPrimitiveValue
                    label="Чеклист работ"
                    value="замена масла"
                />
                <ViewFieldPrimitiveValue label="Оборудование" value="насос " />
                <ViewFieldPrimitiveValue
                    label="Плановая дата проведения"
                    value="00-00-0000"
                />
                <ViewFieldPrimitiveValue
                    label="Причина назначения"
                    value="каждую 1 неделю"
                />
                <ViewFieldPrimitiveValue label="Мастер" value="Иванов И.И." />
            </Stack>
            <Button
                variant="contained"
                onClick={() => console.log(regulatoryWork)}
            >
                Начать работы
            </Button>
        </Stack>
    )
}
