import { z } from 'zod'
import { VALIDATION_MESSAGES } from '@shared/config/zod'
import { DataTypesFromZod } from '@shared/types/Form'

export const formSchema = z.object({
    login: z.string().min(1, VALIDATION_MESSAGES.required),
    password: z.string().min(6, VALIDATION_MESSAGES.minLength(6)),
})

export type AdditionalAuthFormFields = DataTypesFromZod<typeof formSchema>
