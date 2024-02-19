import { Stack, Typography, Button } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, useCallback, useEffect } from 'react'
import { $unfinishedTasks, getUnfinishedTasksFx } from '@entities/Task'
import { ListOfNotCompletedWorks, TWork } from '@entities/Work'
import { TWorkOfObject } from '@entities/Work/model/types'
import { useModalContext } from '@shared/providers/ModalProvider'
import { TAnyFunc } from '@shared/types/Global'
import { Loader } from '@shared/ui/Loaders/Loader/Loader'
import { LoaderWrapper } from '@shared/ui/Wrappers/LoaderWrapper/LoaderWrapper'
import { completeWorkFx } from '../model/completeWork'

type CompleteWorkFormProps = {
    work: TWork | TWorkOfObject
    workName?: string
    cbAfterQuery?: TAnyFunc
}

export const CompleteWorkForm: FC<CompleteWorkFormProps> = ({
    work,
    workName,
    cbAfterQuery,
}) => {
    const completeWorkFxIsLoading = useStore(completeWorkFx.pending)
    const unfinishedTasks = useStore($unfinishedTasks)
    const getUnfinishedTasksFxIsLoading = useStore(getUnfinishedTasksFx.pending)

    const { closeModal } = useModalContext()

    const completeWorkQuery = useCallback(() => {
        completeWorkFx(work.id).then(() => {
            cbAfterQuery?.()
            closeModal()
        })
    }, [work.id, closeModal, cbAfterQuery])

    useEffect(() => {
        getUnfinishedTasksFx()
    }, [])

    if (getUnfinishedTasksFxIsLoading) {
        return <Loader heightValue={20} />
    }
    return (
        <LoaderWrapper loading={completeWorkFxIsLoading}>
            <Stack spacing={1} textAlign={'left'}>
                <Typography>
                    Вы хотите завершить смену на объекте:{' '}
                    <Typography component="span" variant="h6">
                        {workName || ('object' in work && work.object.name)}
                    </Typography>
                </Typography>
                {!!unfinishedTasks?.checks?.length && (
                    <>
                        <Typography>
                            Не выполнены запланированные на Вашу смену работы.
                            Если вы закроете смену не выполнив их, то они будут
                            отмечены как "не выполненные".
                        </Typography>

                        <ListOfNotCompletedWorks
                            label="Список невыполненных работ:"
                            unfinishedTasks={unfinishedTasks.checks}
                        />
                    </>
                )}

                <Button variant="contained" onClick={completeWorkQuery}>
                    Завершить
                </Button>
            </Stack>
        </LoaderWrapper>
    )
}
