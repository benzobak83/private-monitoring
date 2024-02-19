import { Breadcrumbs, Tooltip } from '@mui/material'
import { BreadcrumbsProps } from '@mui/material'
import { FC, memo } from 'react'
import { Link, useLocation } from 'react-router-dom'

export type TBreadCrumb = {
    label: string
    link?: string
    tooltip?: string
    id: number
}

type MyBreadCrumbsProps = {
    breadCrumbs: TBreadCrumb[]
} & BreadcrumbsProps

export const MyBreadCrumbs: FC<MyBreadCrumbsProps> = memo(
    ({
        breadCrumbs,

        ...props
    }) => {
        const location = useLocation()

        return (
            <Breadcrumbs {...props}>
                {breadCrumbs.map(({ label, link, id, tooltip }) => {
                    return (
                        <Tooltip title={tooltip} key={id}>
                            <Link to={link || location.pathname}>{label}</Link>
                        </Tooltip>
                    )
                })}
            </Breadcrumbs>
        )
    }
)
