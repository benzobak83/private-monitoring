import { createEvent } from 'effector'
import { $auth, TAccessFlags } from '@entities/Auth'
import { removeAdditionalToken } from '@shared/api/helpers/additionalApiHelpers'
import { removeBitrixTokensFromLocalStorage } from '@shared/api/helpers/bitrixApiHelpers'

export const logoutEvent = createEvent()

$auth.on(logoutEvent, () => {
    removeAdditionalToken()
    removeBitrixTokensFromLocalStorage()

    return {
        isLogin: false,
        message: 'Ошибка авторизации',
        isFetching: false,
        user: {
            name: '',
            id: 0,
        },
        accessFlags: {} as TAccessFlags,
        url: '',
    }
})
