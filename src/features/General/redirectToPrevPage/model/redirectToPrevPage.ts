import { createEvent, createStore, sample } from 'effector'

export const redirectToPrevPage = createEvent<void>()

export const $redirectToPrevPageIsEmited = createStore<boolean>(false)

sample({
    source: $redirectToPrevPageIsEmited,
    clock: redirectToPrevPage,
    fn: (store) => !store,
    target: $redirectToPrevPageIsEmited,
})
