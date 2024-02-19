import { createEvent } from 'effector'

export type TTokenIsChanged = {
    isChanged: boolean
}

export const pingToken = createEvent()
