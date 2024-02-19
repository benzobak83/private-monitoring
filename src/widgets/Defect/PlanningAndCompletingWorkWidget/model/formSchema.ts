import { z } from 'zod'
import { VALIDATION_MESSAGES, zodErrorMessage } from '@shared/config/zod'
import { DataTypesFromZod } from '@shared/types/Form'

export const formSchema = z.object({
    startDate: z.string(zodErrorMessage(VALIDATION_MESSAGES.invalid_date)),
    endDate: z.string(zodErrorMessage(VALIDATION_MESSAGES.invalid_date)),
    workProducter: z.number(zodErrorMessage(VALIDATION_MESSAGES.required)),
    costMaterials: z.string().optional(),
    limit: z
        .number(zodErrorMessage(VALIDATION_MESSAGES.required))
        .optional()
        .default(0),
})

export type TPlanningWorkOwnSaveItemFields = DataTypesFromZod<typeof formSchema>
