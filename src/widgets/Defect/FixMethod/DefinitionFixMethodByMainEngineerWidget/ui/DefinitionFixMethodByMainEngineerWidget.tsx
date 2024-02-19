import { useStoreMap } from 'effector-react'
import { FC } from 'react'
import { TypeManager } from '@entities/Dict'
import {
    $officialsTableData,
    getResponsiblePersonByKey,
} from '@entities/Settings/Officials'
import { TViewOrCreate } from '@shared/types/Global'
import { MyPaper } from '@shared/ui/Wrappers/MyPaper/MyPaper'
import { DefinitionFixMethodByMainEngineerForm } from './components/DefinitionFixMethodByMainEngineerForm'
import { DefinitionFixMethodByMainEngineerView } from './components/DefinitionFixMethodByMainEngineerView'

type DefinitionFixMethodByMainEngineerWidgetProps = {
    type: TViewOrCreate
}

export const DefinitionFixMethodByMainEngineerWidget: FC<
    DefinitionFixMethodByMainEngineerWidgetProps
> = ({ type }) => {
    const persons = useStoreMap($officialsTableData, (store) => store.rows)
    const powerEngineer = getResponsiblePersonByKey(
        persons,
        TypeManager.ENGINEER
    )
    return (
        <MyPaper title={`Главный инженер - ${powerEngineer?.name}`}>
            {type === 'create' && <DefinitionFixMethodByMainEngineerForm />}
            {type === 'view' && <DefinitionFixMethodByMainEngineerView />}
        </MyPaper>
    )
}
