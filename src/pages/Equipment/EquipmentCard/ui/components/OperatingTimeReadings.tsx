import { Stack } from '@mui/material'
import { useStore } from 'effector-react'
import { isNaN } from 'lodash'
import { FC, useEffect, useState } from 'react'
import { OperatingTimeGraph } from '@/widgets/Equipment/OperatingTimeGraph'
import { AddOperatingTimeForm } from '@/features/Equipment/addOperatingTime'
import {
    $operatingTime,
    getOperatingTimeFx,
    resetOperatingTime,
} from '@entities/Equipment'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'

export const OperatingTimeReadings: FC = () => {
    const operatingTime = useStore($operatingTime)

    const [allTime, setAllTime] = useState<number>(Number(operatingTime.sum))

    const { id } = useDefaultParams()

    useEffect(() => {
        getOperatingTimeFx(id)
    }, [id])

    useEffect(() => {
        return () => resetOperatingTime()
    }, [])

    useEffect(() => {
        if (isNaN(operatingTime.sum)) return

        setAllTime(Number(operatingTime.sum))
    }, [operatingTime.sum])

    if (!Object.keys(operatingTime).length || isNaN(operatingTime.sum)) {
        return null
    }

    return (
        <Stack direction="row" spacing={2}>
            <AddOperatingTimeForm
                setAllTime={setAllTime}
                allTimeInit={Number(operatingTime.sum)}
            />
            <OperatingTimeGraph lastValue={String(allTime)} />
        </Stack>
    )
}
