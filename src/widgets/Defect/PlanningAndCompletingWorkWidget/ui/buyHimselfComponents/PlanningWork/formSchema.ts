import { z } from 'zod'
import { VALIDATION_MESSAGES, zodErrorMessage } from '@shared/config/zod'
import { DataTypesFromZod } from '@shared/types/Form'

export const formSchema = z.object({
    dateStart: z.string(zodErrorMessage(VALIDATION_MESSAGES.invalid_date)),
    dateEnd: z.string(zodErrorMessage(VALIDATION_MESSAGES.invalid_date)),
})

export type PlanningWorkFormFields = DataTypesFromZod<typeof formSchema>
