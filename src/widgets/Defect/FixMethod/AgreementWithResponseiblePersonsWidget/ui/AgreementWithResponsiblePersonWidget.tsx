import { useStore } from 'effector-react'
import { FC } from 'react'
import { $fixMethod } from '@entities/Defect/model/getFixMethod'
import { TViewOrCreate } from '@shared/types/Global'
import { MyPaper } from '@shared/ui/Wrappers/MyPaper/MyPaper'
import { AgreementWithResponsiblePersonFormList } from './components/AgreementWithResponsiblePersonFormList'
import { AgreementWithResponsiblePersonViewList } from './components/AgreementWithResponsiblePersonViewList'

type AgreementWithResponsiblePersonWidgetProps = {
    type: TViewOrCreate
}

export const AgreementWithResponsiblePersonWidget: FC<
    AgreementWithResponsiblePersonWidgetProps
> = ({ type }) => {
    const fixMethod = useStore($fixMethod)
    return (
        <MyPaper
            title="Согласование с ответственными лицами"
            accordion={type === 'view'}
        >
            {type === 'create' && (
                <AgreementWithResponsiblePersonFormList
                    responsiblePersons={
                        fixMethod[fixMethod.length - 1].agreement
                    }
                />
            )}
            {type === 'view' && <AgreementWithResponsiblePersonViewList />}
        </MyPaper>
    )
}
