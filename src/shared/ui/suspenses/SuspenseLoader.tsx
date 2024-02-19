import { FC, ReactNode, Suspense } from 'react'
import { Loader } from '../Loaders/Loader/Loader'

type SuspenseLoaderProps = {
    children: ReactNode
}

export const SuspenseLoader: FC<SuspenseLoaderProps> = ({ children }) => {
    return (
        <Suspense fallback={<Loader heightValue={100} />}>{children}</Suspense>
    )
}
