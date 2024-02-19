import { createEffect } from 'effector'
import { $auth, TAccessFlags, TUser } from '@entities/Auth'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { removeAdditionalToken } from '@shared/api/helpers/additionalApiHelpers'
import { TErrorResponse, TResponse } from '@shared/api/types'

type TInitUserFxResponse = TResponse<{
    user: TUser
    accessFlags: TAccessFlags
}>

export const initUserFx = createEffect<
    void,
    TInitUserFxResponse,
    TErrorResponse
>(() => {
    return api.get(ENDPOINTS.auth.additional.initUser)
})

$auth.on(initUserFx.doneData, (state, { data }) => {
    return {
        ...state,
        ...data.data,
        isLogin: true,
        isFetching: false,
    }
})

$auth.on(initUserFx, (state) => {
    return {
        ...state,
        isFetching: true,
    }
})

$auth.on(initUserFx.fail, (state) => {
    removeAdditionalToken()
    return {
        ...state,
        isFetching: false,
        isLogin: false,
    }
})
