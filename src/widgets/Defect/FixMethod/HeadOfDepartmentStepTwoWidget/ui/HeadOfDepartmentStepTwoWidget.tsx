import { FC } from 'react'
import { TViewOrCreate } from '@shared/types/Global'
import { MyPaper } from '@shared/ui/Wrappers/MyPaper/MyPaper'
import { HeadOfDepartmentStepTwoForm } from './components/HeadOfDepartmentStepTwoForm'
import { HeadOfDepartmentStepTwoView } from './components/HeadOfDepartmentStepTwoView'

type HeadOfDepartmentStepTwoWidgetProps = {
    type: TViewOrCreate
}

export const HeadOfDepartmentStepTwoWidget: FC<
    HeadOfDepartmentStepTwoWidgetProps
> = ({ type }) => {
    return (
        <MyPaper
            title="Начальник подразделения - шаг 2"
            accordion={type === 'view'}
        >
            {type === 'create' && <HeadOfDepartmentStepTwoForm />}
            {type === 'view' && <HeadOfDepartmentStepTwoView />}
        </MyPaper>
    )
}
