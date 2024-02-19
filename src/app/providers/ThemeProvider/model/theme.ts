import { createTheme } from '@mui/material'
import variables from '@shared/styles/variables/_export.module.scss'

export const theme = createTheme({
    typography: {
        allVariants: {
            fontSize: variables.fontSizeS,
        },
        button: {
            fontSize: variables.fontSizeBtn,
        },
    },
    components: {},
})
theme.typography.h1 = {
    fontSize: variables.fontSizeXL,
    fontWeight: 600,
}
theme.typography.h2 = {
    fontSize: variables.fontSizeL,
    fontWeight: 600,
}
theme.typography.h3 = {
    fontSize: variables.fontSizeL,
    fontWeight: 400,
}
theme.typography.h4 = {
    fontSize: variables.fontSizeM,
    fontWeight: 600,
}
theme.typography.h5 = {
    fontSize: variables.fontSizeM,
    fontWeight: 400,
}
theme.typography.h6 = {
    fontSize: variables.fontSizeS,
    fontWeight: 600,
}
