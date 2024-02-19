import { z } from 'zod'
import { VALIDATION_MESSAGES, zodErrorMessage } from '@shared/config/zod'
import { DataTypesFromZod } from '@shared/types/Form'

export const formSchema = z
    .object({
        isAvailable: z.boolean(zodErrorMessage(VALIDATION_MESSAGES.required)),
        login: z
            .string(zodErrorMessage(VALIDATION_MESSAGES.required))
            .min(3, VALIDATION_MESSAGES.minLength(3))
            .optional(),
        password: z
            .string(zodErrorMessage(VALIDATION_MESSAGES.required))
            .min(6, VALIDATION_MESSAGES.minLength(6))
            .optional(),
    })
    .refine(
        ({ isAvailable, login }) => {
            if (isAvailable && !login) {
                return false
            }
            return true
        },
        { message: VALIDATION_MESSAGES.required, path: ['login'] }
    )

export type EditStaffFormFields = DataTypesFromZod<typeof formSchema>
