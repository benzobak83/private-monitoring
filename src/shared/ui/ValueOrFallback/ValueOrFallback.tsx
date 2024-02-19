import { FC, ReactNode, memo } from 'react'

type ValueOrFallbackProps = {
    value: ReactNode
    fallback?: ReactNode
}

export const ValueOrFallback: FC<ValueOrFallbackProps> = memo(
    ({ value, fallback = 'Не назначено' }) => {
        return <> {value || fallback}</>
    }
)
