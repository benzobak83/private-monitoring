import { createEvent, createStore, sample } from 'effector'
import uniqid from 'uniqid'
import { TError } from '../../api/types'

export const $logs = createStore<TError[]>([])
export const pushLog = createEvent<Omit<TError, 'id'>>()
export const removeLog = createEvent<string>()

//пуш лога
sample({
    clock: pushLog,
    source: $logs,
    fn: (logs, newLog) => {
        const newLogWithId = { ...newLog, id: uniqid() }

        setTimeout(() => {
            removeLog(newLogWithId.id)
        }, 3000)

        return [...logs, newLogWithId]
    },
    target: $logs,
})

//удаление лога
sample({
    clock: removeLog,
    source: $logs,
    fn: (logs, logId) => logs.filter((log) => log.id !== logId),
    target: $logs,
})
