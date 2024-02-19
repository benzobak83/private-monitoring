import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Stack,
    Typography,
} from '@mui/material'
import { FC, ReactNode, useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { warningColor } from '@shared/styles/variables/_export.module.scss'
import { useQueryFilter } from '../lib/useQueryFilter'
import { setFilter } from '../model/filter'
import { FilterKeys } from '../model/types/filter.types'
import { FilterControllers } from './FilterControllers'

type FilterProps = {
    children?: ReactNode
    label: string
    filterName: FilterKeys
    formName?: string
    onSubmit: (data: Record<string, any>) => void
    leftContent: ReactNode
    rightContent?: ReactNode
    active: boolean
}

export const Filter: FC<FilterProps> = ({
    label,
    children,
    filterName,
    active = false,
    formName,
    onSubmit,
    leftContent,
    rightContent,
}) => {
    const { handleSubmit } = useFormContext()
    const [key, setKey] = useState<number>(0)

    const queryFilter = useQueryFilter()

    const forceUpdate = useCallback(() => {
        setKey((prev) => ++prev)
    }, [setKey])

    useEffect(() => {
        if (!queryFilter) return
        forceUpdate()
        setFilter({ type: filterName, value: queryFilter })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryFilter, filterName])

    return (
        <Accordion elevation={3}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Stack direction={'row'} spacing={0.5} alignItems={'center'}>
                    <Typography variant="h6">{label}</Typography>
                    {active && (
                        <Typography variant="h6" sx={{ color: warningColor }}>
                            (активен)
                        </Typography>
                    )}
                </Stack>
            </AccordionSummary>
            <AccordionDetails key={key}>
                <form
                    id={formName || filterName}
                    onSubmit={handleSubmit(onSubmit)}
                ></form>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '10px',
                    }}
                >
                    <Stack spacing={1.5} sx={{ flex: '0 1 48%' }}>
                        {leftContent}
                    </Stack>
                    <Stack spacing={1.5} sx={{ flex: '0 1 48%' }}>
                        {rightContent}
                    </Stack>
                </Box>
                {children}
                <FilterControllers
                    filterName={filterName}
                    forceUpdate={forceUpdate}
                />
            </AccordionDetails>
        </Accordion>
    )
}
