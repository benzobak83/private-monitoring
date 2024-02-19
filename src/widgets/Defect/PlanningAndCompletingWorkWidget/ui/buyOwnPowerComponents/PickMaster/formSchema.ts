import { z } from 'zod'
import { VALIDATION_MESSAGES, zodErrorMessage } from '@shared/config/zod'
import { DataTypesFromZod } from '@shared/types/Form'

export const formSchema = z.object({
    dateStart: z.string(zodErrorMessage(VALIDATION_MESSAGES.invalid_date)),
    dateEnd: z.string(zodErrorMessage(VALIDATION_MESSAGES.invalid_date)),
    workerId: z.number(zodErrorMessage(VALIDATION_MESSAGES.required)),
    sum: z.number(zodErrorMessage(VALIDATION_MESSAGES.required)),
})

export type PickMasterFormFields = DataTypesFromZod<typeof formSchema>
