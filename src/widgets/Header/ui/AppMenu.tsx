import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
    Box,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
} from '@mui/material'
import { FC, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { NAV_BUTTONS } from '../lib/navButtons'
import { useFirstEndpoint } from '../lib/useFirstEndpoint'

const MENU_ITEM_SX = { color: 'black' }

export const AppMenu: FC = () => {
    const endpoint = useFirstEndpoint()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const isActive = useCallback(
        (route: string) => {
            return route === endpoint
        },
        [endpoint]
    )

    return (
        <Box>
            <IconButton
                aria-label="more"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                sx={{ minWidth: '50px' }}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {NAV_BUTTONS.map((props, i) => {
                    const { label, icon, href, link } = props

                    if (href) {
                        return (
                            <a
                                key={i}
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <MenuItem
                                    onClick={handleClose}
                                    sx={MENU_ITEM_SX}
                                >
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText>{label}</ListItemText>
                                </MenuItem>
                            </a>
                        )
                    }
                    if (!link) return
                    return (
                        <Link to={link} key={i}>
                            <MenuItem
                                selected={isActive(link)}
                                onClick={handleClose}
                                sx={MENU_ITEM_SX}
                            >
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText>{label}</ListItemText>
                            </MenuItem>
                        </Link>
                    )
                })}
            </Menu>
        </Box>
    )
}
