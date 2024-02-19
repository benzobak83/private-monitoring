import { createEffect } from 'effector'
import { $auth } from '@entities/Auth'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { setAdditionalToken } from '@shared/api/helpers/additionalApiHelpers'
import { pingToken } from '@shared/api/model/tokenIsChanged'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { AdditionalAuthFormFields } from './formSchema'
import { TAdditionalToken } from './types'

export const additionalLoginFx = createEffect<
    AdditionalAuthFormFields,
    TResponse<TAdditionalToken>,
    TErrorResponse
>((dto) => {
    return api.post(ENDPOINTS.auth.additional.login, dto)
})

$auth.on(additionalLoginFx, (state) => {
    return {
        ...state,
        isFetching: true,
    }
})
$auth.on(additionalLoginFx.fail, (state) => {
    return {
        ...state,
        isFetching: false,
    }
})

additionalLoginFx.doneData.watch(({ data }) => {
    setAdditionalToken(data.data.access_token)
    pingToken()
    //логику изменения auth сделать после initUserFx, т.к. просто логина недостаочно, нужен еще пользователь
})
