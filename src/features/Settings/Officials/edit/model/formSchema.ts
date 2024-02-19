import { z } from 'zod'
import { VALIDATION_MESSAGES, zodErrorMessage } from '@shared/config/zod'
import { DataTypesFromZod } from '@shared/types/Form'

export const formSchema = z.object({
    manager: z
        .array(
            z.object({
                key: z.number(zodErrorMessage(VALIDATION_MESSAGES.required)),
                name: z.string(zodErrorMessage(VALIDATION_MESSAGES.required)),
                users: z.array(
                    z.object({
                        id: z.number(),
                        notify: z.boolean().optional(),
                        name: z.string(),
                    })
                ),
            })
        )
        .min(6, VALIDATION_MESSAGES.required),
})

export type EditOfficialsFormFields = DataTypesFromZod<typeof formSchema>
