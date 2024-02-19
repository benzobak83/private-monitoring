import { Stack, Divider } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import { ROUTES } from '@shared/lib/consts/routes'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'
import { MyPaper } from '@shared/ui/Wrappers/MyPaper/MyPaper'
import { $equipmentItem } from '../model/getItem'

const typographySx = { whiteSpace: 'none' }

export const EquipmentInfoBlock: FC = () => {
    const equipment = useStore($equipmentItem)
    return (
        <MyPaper title={equipment.name}>
            <Stack spacing={2} direction="row" sx={{ overflow: 'auto' }}>
                <Stack spacing={0.5}>
                    <ViewFieldPrimitiveValue
                        label="Тип оборудования"
                        link={ROUTES.settings.typesOfEquipmentEditGet(
                            equipment.typeEquipment?.id
                        )}
                        noWrap
                        value={equipment.typeEquipment?.name}
                    />
                    <ViewFieldPrimitiveValue
                        label="МОЛ"
                        noWrap
                        sx={typographySx}
                        value={equipment.user?.name}
                    />
                </Stack>

                <Stack spacing={0.5}>
                    <ViewFieldPrimitiveValue
                        label="Инвентарный номер"
                        sx={typographySx}
                        noWrap
                        value={equipment.inventoryNumber}
                    />
                    <ViewFieldPrimitiveValue
                        label="Номер по тех.схемe"
                        sx={typographySx}
                        noWrap
                        value={equipment.technicalNumber}
                    />
                </Stack>

                <Divider flexItem orientation="vertical" />
                <Stack spacing={0.5}>
                    <ViewFieldPrimitiveValue
                        label="Объект"
                        sx={typographySx}
                        noWrap
                        value={equipment.object?.name}
                        link={ROUTES.object.cardGet(equipment.object?.id)}
                    />
                    <ViewFieldPrimitiveValue
                        label="Инвентарный номер"
                        sx={typographySx}
                        noWrap
                        value={equipment?.fixedAsset?.inventoryNumber}
                    />
                </Stack>
                <Stack spacing={0.5}>
                    <ViewFieldPrimitiveValue
                        label="Адрес"
                        noWrap
                        sx={typographySx}
                        value={equipment?.fixedAsset?.address}
                    />
                    <ViewFieldPrimitiveValue
                        label="Цех"
                        noWrap
                        sx={typographySx}
                        value={equipment?.fixedAsset?.workshop}
                    />
                </Stack>
            </Stack>
        </MyPaper>
    )
}
