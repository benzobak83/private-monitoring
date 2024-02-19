import { AxiosResponse } from 'axios'
import { createEffect } from 'effector'
import { $auth } from '@entities/Auth'
import { TAuth, TUser } from '@entities/Auth'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'

type TAuthLoginResponse = TResponse<
    Pick<TAuth<Partial<TUser>>, 'user' | 'accessFlags'>
>

export const bitrixLoginFx = createEffect<
    void,
    AxiosResponse<TAuthLoginResponse>,
    TErrorResponse
>(async () => {
    const response = await api.get(ENDPOINTS.auth.bitrix.login)
    return response
})

$auth.on(bitrixLoginFx, (state) => {
    return {
        ...state,
        isFetching: true,
    }
})

$auth.on(bitrixLoginFx.done, (state, { result }) => {
    return {
        ...state,
        isLogin: true,
        message: '',
        ...result.data?.data,
    }
})

$auth.on(bitrixLoginFx.fail, (state, { error }) => {
    return {
        ...state,
        message: `${error.response?.data?.exception}`,
        isLogin: false,
    }
})

$auth.on(bitrixLoginFx.finally, (state) => {
    return {
        ...state,
        isFetching: false,
    }
})
