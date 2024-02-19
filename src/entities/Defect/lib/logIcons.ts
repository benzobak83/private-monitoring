import ArchitectureOutlinedIcon from '@mui/icons-material/ArchitectureOutlined'
import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import LayersClearOutlinedIcon from '@mui/icons-material/LayersClearOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { DefectStageIds } from '../model/types/types'

export const LOG_ICONS: Record<
    DefectStageIds,
    OverridableComponent<SvgIconTypeMap<Record<string, any>, 'svg'>>
> = {
    [DefectStageIds.FIX_METHOD]: BalanceOutlinedIcon,
    [DefectStageIds.PLANNING_WORK]: ArchitectureOutlinedIcon,
    [DefectStageIds.COMPLETING_WORK]: ArchitectureOutlinedIcon,
    [DefectStageIds.BUY_NEW]: ShoppingCartOutlinedIcon,
    [DefectStageIds.WRITE_OFF_MATERIALS]: LayersClearOutlinedIcon,
    [DefectStageIds.COMPLETED]: CheckCircleOutlinedIcon,
}
