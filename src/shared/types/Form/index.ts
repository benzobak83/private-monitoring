import { AutocompleteProps, SelectProps } from '@mui/material'
import { ZodType, z } from 'zod'

export type TErrorMessage = string | undefined

export type DataTypesFromZod<formSchema extends ZodType<any, any, any>> =
    z.infer<formSchema>

export type TSearchSelectProps = {
    name: string
    label?: string
    helperText?: string
    needReset?: boolean
} & Partial<AutocompleteProps<any, any, any, any>>

export type TDefaultSelectProps = {
    name: string
    label?: string
    helperText?: string
} & Partial<SelectProps>
