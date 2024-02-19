export type TMaterialItemOfList = {
    uuid: string
    frp_uuid: string
    name: string
    balance: number
    cost: number
}

export type TMaterialsAct = {
    uuid: string
    date: string
    number: string
    sum: number
}

export type TMaterialsActOfObjectByCompletingId = {
    planningId: number
    executionId: number
} & TMaterialsAct
