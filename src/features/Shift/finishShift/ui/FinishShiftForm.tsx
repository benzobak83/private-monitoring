import {
    Box,
    Button,
    List,
    ListItem,
    ListItemText,
    Stack,
    Typography,
} from '@mui/material'

export const FinishShiftForm = () => {
    return (
        <Box>
            <Stack textAlign="left">
                <Typography textAlign="center">
                    Вы хотите завершить смену на объекте: КНС-5
                </Typography>
                <Box mt={1} sx={{ width: '400px' }}>
                    <Typography variant="h6">
                        Прошло более 30 минут после внесения показаний, нужно
                        внести более свежие показания:
                    </Typography>
                    <List dense={true}>
                        <ListItem>
                            <ListItemText>Насос 1</ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>Насос 2</ListItemText>
                        </ListItem>
                    </List>
                </Box>
            </Stack>
            <Button variant="contained">Завершить смену</Button>
        </Box>
    )
}
