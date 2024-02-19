import { FC } from 'react'
import { TViewOrCreate } from '@shared/types/Global'
import { MyPaper } from '@shared/ui/Wrappers/MyPaper/MyPaper'
import { DefinitionFixMethodForm } from './components/DefinitionFixMethodForm'
import { DefinitionFixMethodView } from './components/DefinitionFixMethodView'

type DefinitionFixMethodWidgetProps = {
    type: TViewOrCreate
}

export const DefinitionFixMethodWidget: FC<DefinitionFixMethodWidgetProps> = ({
    type,
}) => {
    return (
        <MyPaper title="ОПО" accordion={type === 'view'}>
            {type === 'create' && <DefinitionFixMethodForm />}
            {type === 'view' && <DefinitionFixMethodView />}
        </MyPaper>
    )
}
