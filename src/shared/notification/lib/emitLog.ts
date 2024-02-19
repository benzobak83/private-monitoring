import { TErrorResponse } from '../../api/types'
import { MESSAGES_FOR_LOG } from '../consts/messages'
import { pushLog } from '../model/logger'

export const emitErrorLog = <T extends { params: any; error: TErrorResponse }>(
    e: T | undefined,
    textError: string = MESSAGES_FOR_LOG.error.default
) => {
    const error = e?.error?.response || (e as any)?.response
    const typeError = error?.data?.errors?.[0]?.type
    const messageError = error?.data?.errors?.[0]?.message

    if (typeError && messageError) {
        pushLog({
            type: typeError,
            message: messageError,
        })
    } else {
        pushLog({
            type: 'logic',
            message: textError,
        })
    }
}
export const emitSuccessLog = (textSuccess: string) => {
    const typeLog = 'success'
    pushLog({
        type: typeLog,
        message: textSuccess,
    })
}
