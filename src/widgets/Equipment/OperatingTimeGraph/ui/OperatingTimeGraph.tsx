import { Box } from '@mui/material'
import { useStoreMap } from 'effector-react'
import { FC, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { $operatingTime } from '@entities/Equipment'

type OperatingTimeGraphProps = {
    lastValue?: string
}

export const OperatingTimeGraph: FC<OperatingTimeGraphProps> = ({
    lastValue,
}) => {
    const graphRows = useStoreMap(
        $operatingTime,
        (operatingTime) => operatingTime.graph
    )
    const dataWithLastValue = useMemo(() => {
        console.log('lastValue - ', lastValue)
        if (
            !lastValue ||
            graphRows?.[graphRows.length - 1]?.value == lastValue
        ) {
            return graphRows
        }
        const clonnedData = structuredClone(graphRows)
        const lastValueOfData = { value: lastValue }

        clonnedData.push(lastValueOfData)

        return clonnedData
    }, [lastValue, graphRows])

    return (
        <Box flexBasis="50%">
            <LineChart width={450} height={270} data={dataWithLastValue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis />
                <YAxis type="number" />
                <Tooltip formatter={(val) => [val, 'Наработка']} />
                <Line
                    animationDuration={200}
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                />
            </LineChart>
        </Box>
    )
}
