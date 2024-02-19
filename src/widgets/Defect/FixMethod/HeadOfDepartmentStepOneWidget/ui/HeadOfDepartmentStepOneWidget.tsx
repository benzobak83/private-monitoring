import { FC } from 'react'
import { TViewOrCreate } from '@shared/types/Global'
import { MyPaper } from '@shared/ui/Wrappers/MyPaper/MyPaper'
import { HeadOfDepartmentStepOneForm } from './components/HeadOfDepartmentStepOneForm'
import { HeadOfDepartmentStepOneView } from './components/HeadOfDepartmentStepOneView'

type HeadOfDepartmentStepOneWidgetProps = {
    type: TViewOrCreate
}

export const HeadOfDepartmentStepOneWidget: FC<
    HeadOfDepartmentStepOneWidgetProps
> = ({ type }) => {
    return (
        <MyPaper
            title="Начальник подразделения - шаг 1"
            accordion={type === 'view'}
        >
            {type === 'create' && <HeadOfDepartmentStepOneForm />}
            {type === 'view' && <HeadOfDepartmentStepOneView />}
        </MyPaper>
    )
}
