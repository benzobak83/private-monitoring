import { Typography, Stack } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, useEffect } from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'
import {
    $defectGraph,
    DefectTypeIds,
    getDefectGraphFx,
    getDefectOptionName,
} from '@entities/Defect'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { Loader } from '@shared/ui/Loaders/Loader/Loader'

const TICKS = {
    [DefectTypeIds.WARNING]: 'И',
    [DefectTypeIds.NEGATIVE]: 'А',
}

const formatTooltip = (typeDefect: DefectTypeIds) => {
    return [getDefectOptionName(typeDefect) || 'Без происшествий', 'Статус']
}
const formatTick = (defectType: DefectTypeIds) => TICKS[defectType] || ''
export const DefectsOfEquipmentGraph: FC = () => {
    const getDefectGraphFxIsLoading = useStore(getDefectGraphFx.pending)
    const defectGraph = useStore($defectGraph)

    const { id } = useDefaultParams()

    useEffect(() => {
        getDefectGraphFx(id)
    }, [id])

    if (getDefectGraphFxIsLoading) {
        return <Loader heightValue={50} />
    }
    if (!defectGraph?.length) {
        return (
            <Stack
                sx={{
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography>Нет данных</Typography>
            </Stack>
        )
    }
    return (
        <ResponsiveContainer height={'87%'}>
            <LineChart
                width={500}
                height={300}
                data={defectGraph}
                margin={{ left: -30, right: 30, top: 20 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="date"
                    tickFormatter={(value) => value.substring(0, 2)}
                />
                <YAxis
                    type="category"
                    reversed={
                        defectGraph[0]?.result?.id === DefectTypeIds.NEGATIVE
                    }
                    tickFormatter={(defectType: DefectTypeIds) => {
                        return formatTick(defectType)
                    }}
                />

                <Tooltip
                    formatter={(defectType: DefectTypeIds) =>
                        formatTooltip(defectType)
                    }
                />

                <Line
                    type="monotone"
                    dataKey="result.id"
                    stroke="#8884d8"
                    animationDuration={200}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}
