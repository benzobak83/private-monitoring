import { z } from 'zod'
import { VALIDATION_MESSAGES, zodErrorMessage } from '@shared/config/zod'
import { DataTypesFromZod } from '@shared/types/Form'

export const formSchema = z.object({
    subdivisionKeys: z
        .array(z.number(), zodErrorMessage(VALIDATION_MESSAGES.required))
        .min(1, VALIDATION_MESSAGES.required)
        .optional()
        .nullable()
        .or(z.array(z.void())),
})

export type HeadOfDepartmentStepTwoFormFields = DataTypesFromZod<
    typeof formSchema
>
