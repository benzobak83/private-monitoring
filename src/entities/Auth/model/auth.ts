import { createStore } from 'effector'
import { TAccessFlags, TAuth, TUser } from './types'

export const $auth = createStore<TAuth<Partial<TUser>>>({
    isLogin: false,
    message: '',
    isFetching: true,
    user: {
        name: '',
        id: 0,
    },
    accessFlags: {} as TAccessFlags,
})
