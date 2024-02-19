import { z } from 'zod'
import { DataTypesFromZod } from '@shared/types/Form'

export const formSchema = z.object({
    checklistInspection: z
        .object({
            typeControl: z.number().optional().nullable(),
            date: z.string().optional().nullable(),
            isRegular: z.boolean().optional().nullable(),
            repeated: z.number().optional(),
            mileage: z.string().or(z.number()).optional(),
            frequency: z.number().optional().nullable(),
            checklistId: z.number().optional().nullable(),
        })
        .optional(),

    checklistMaintenance: z
        .object({
            typeControl: z.number().optional().nullable(),
            date: z.string().optional().nullable(),
            frequency: z.number().optional().nullable(),
            isRegular: z.boolean().optional().nullable(),
            repeated: z.number().optional(),
            mileage: z.string().or(z.number()).optional(),
            checklistId: z.number().optional().nullable(),
        })
        .optional(),
})

export type EditTypeOfEquipmentFormFields = DataTypesFromZod<typeof formSchema>
