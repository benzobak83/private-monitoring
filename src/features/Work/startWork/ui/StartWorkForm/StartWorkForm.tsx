import { useStore } from 'effector-react'
import { FC, useCallback } from 'react'
import {
    TStartWorkContext,
    reloadStartWorkListTabledata,
    reloadWorklistTabledata,
} from '@entities/Work'
import { useModalContext } from '@shared/providers/ModalProvider'
import { LoaderWrapper } from '@shared/ui/Wrappers/LoaderWrapper/LoaderWrapper'
import { startWorkFx } from '../../model/startWork'
import { Busy } from './states/Busy'
import { Free } from './states/Free'

type StartWorkFormProps = {
    work: TStartWorkContext
}

export const StartWorkForm: FC<StartWorkFormProps> = ({ work }) => {
    const startWorkFxIsLoading = useStore(startWorkFx.pending)

    const { closeModal } = useModalContext()

    const startWorkQuery = useCallback(() => {
        startWorkFx({ objectId: work.object.id }).then(() => {
            closeModal()
            reloadStartWorkListTabledata()
            reloadWorklistTabledata()
        })
    }, [work.object.id, closeModal])

    if (work.isWorkInProgress) {
        return (
            <LoaderWrapper loading={startWorkFxIsLoading}>
                <Busy work={work} handleSubmit={startWorkQuery} />
            </LoaderWrapper>
        )
    } else {
        return (
            <LoaderWrapper loading={startWorkFxIsLoading}>
                <Free work={work} handleSubmit={startWorkQuery} />
            </LoaderWrapper>
        )
    }
}
