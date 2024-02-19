import { z } from 'zod'
import { VALIDATION_MESSAGES, zodErrorMessage } from '@shared/config/zod'
import { DataTypesFromZod } from '@shared/types/Form'

export const formSchema = z.object({
    equipmentOld: z.string(zodErrorMessage(VALIDATION_MESSAGES.required)),
    equipmentNew: z.string(zodErrorMessage(VALIDATION_MESSAGES.required)),
})

export type BuyNewFormFields = DataTypesFromZod<typeof formSchema>
