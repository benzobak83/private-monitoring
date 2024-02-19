import { Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { ViewInspectionBtn } from '@entities/Check'
import { ROUTES } from '@shared/lib/consts/routes'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'
import { MyPaper } from '@shared/ui/Wrappers/MyPaper/MyPaper'
import { TDefect } from '../model/types/types'

type DefectInformationProps = {
    editPriorityRenderProp?: (prioritet: number) => JSX.Element
    defect: TDefect
}

export const DefectInformation: FC<DefectInformationProps> = ({
    editPriorityRenderProp,
    defect,
}) => {
    return (
        <MyPaper title="Неисправность">
            <Stack spacing={0.5} sx={{ maxHeight: '25vh', overflow: 'auto' }}>
                <ViewFieldPrimitiveValue
                    label="Тип неисправности"
                    value={defect?.check?.result?.name}
                />
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems={'center'}
                    sx={{ height: '19.5px' }}
                >
                    <Typography variant="h6">Дата выявления:</Typography>
                    <ViewInspectionBtn
                        buttonSx={{
                            marginLeft: '0px',
                            padding: '0px',
                            lineHeight: '1',
                        }}
                        checkId={defect?.check?.id}
                        btnText={defect?.check?.createdAt}
                    />
                </Stack>

                <ViewFieldPrimitiveValue
                    label="Подразделение"
                    value={defect?.subdivision?.name}
                />
                <ViewFieldPrimitiveValue
                    label="Объект"
                    value={defect?.object?.name}
                />
                <ViewFieldPrimitiveValue
                    label="Оборудование"
                    value={defect?.equipment?.name}
                />
                <ViewFieldPrimitiveValue
                    label="Приоритет"
                    value={editPriorityRenderProp?.(defect.priority)}
                />
                <ViewFieldPrimitiveValue
                    label="Чеклист"
                    link={ROUTES.settings.inspectionChecklistItemGet(
                        defect?.check?.checklistId
                    )}
                    value={defect?.check?.checklist?.name}
                />

                <ViewFieldPrimitiveValue
                    label="Метод устранения"
                    value={defect?.method?.name}
                />
                <ViewFieldPrimitiveValue
                    label="Подрядчик"
                    value={defect?.client?.name}
                />

                <ViewFieldPrimitiveValue
                    label="Комментарий"
                    value={defect?.check?.comment}
                />
            </Stack>
        </MyPaper>
    )
}
