import { FC, memo } from 'react'
import { useEffect, useState } from 'react'

type StopwatchProps = {
    currentTime?: number
}

export const Stopwatch: FC<StopwatchProps> = memo(({ currentTime = 0 }) => {
    const [time, setTime] = useState(currentTime * 1000)

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prevTime) => prevTime + 1000)
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <div className="stopwatch">
            <div className="numbers">
                <span>
                    {('0' + Math.floor((time / 3600000) % 60)).slice(-2)}:
                </span>
                <span>
                    {('0' + Math.floor((time / 60000) % 60)).slice(-2)}:
                </span>
                <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}</span>
            </div>
        </div>
    )
})
