import { FC } from 'react'
import { TViewOrCreate } from '@shared/types/Global'
import { MyPaper } from '@shared/ui/Wrappers/MyPaper/MyPaper'
import { BuyNewForm } from './components/BuyNewForm'
import { BuyNewView } from './components/BuyNewView'

type BuyNewWidgetProps = {
    type: TViewOrCreate
}

export const BuyNewWidget: FC<BuyNewWidgetProps> = ({ type }) => {
    return (
        <MyPaper
            title="Начальник подразделения - ФИО"
            accordion={type === 'view'}
        >
            {type === 'create' && <BuyNewForm />}
            {type === 'view' && <BuyNewView />}
        </MyPaper>
    )
}
