import { Button, Stack } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@shared/lib/consts/routes'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'
import { MyPaper } from '@shared/ui/Wrappers/MyPaper/MyPaper'

export const WorkNotStarted: FC = () => {
    return (
        <MyPaper>
            <Stack direction={'row'} alignItems={'center'} spacing={2}>
                <ViewFieldPrimitiveValue
                    label="Текущая смена"
                    value={'Не начата'}
                />
                <Link to={ROUTES.work.start}>
                    <Button variant="contained">
                        Выбрать объект для начала смены
                    </Button>
                </Link>
            </Stack>
        </MyPaper>
    )
}
