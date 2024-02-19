export const hoverOpacitySx = {
    cursor: 'pointer',
    '&:hover': { opacity: '0.7' },
    transition: 'opacity 0.2s',
}

export const defaultBoxShadowSx = {
    boxShadow: '1px 1px 4px 1px rgba(34, 60, 80, 0.1)',
}

export const chipMultilineSx = {
    height: 'auto',

    '& .MuiChip-label': {
        display: 'block',
        whiteSpace: 'normal',
    },
}
