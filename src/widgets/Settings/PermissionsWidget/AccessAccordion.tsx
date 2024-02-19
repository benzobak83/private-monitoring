import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import { Stack } from '@mui/material'
import { FC } from 'react'
import { IRoleItem } from './store/types'

type AccessAccordionProps = {
    role: IRoleItem
    onPermissionEdit: (
        event: React.MouseEvent<HTMLButtonElement>,
        id: number
    ) => void
    onRoleDelete: (
        event: React.MouseEvent<HTMLButtonElement>,
        id: number
    ) => void
    onHandleGrant: (
        event: React.MouseEvent<HTMLButtonElement>,
        id: number
    ) => void
    onHandleRevoke: (
        event: React.MouseEvent<HTMLButtonElement>,
        id: number,
        userId: number
    ) => void
}

const AccessAccordion: FC<AccessAccordionProps> = ({
    role,
    onPermissionEdit,
    onRoleDelete,
    onHandleGrant,
    onHandleRevoke,
}) => {
    return (
        <Accordion key={role.name}>
            <AccordionSummary
                expandIcon={<span className="micon micon__arrow-down" />}
                sx={{
                    flexDirection: 'row-reverse',
                    gap: '10px',
                    alignItems: 'center',
                }}
            >
                <Stack
                    direction="row"
                    width="100%"
                    justifyContent="space-between"
                >
                    <Typography variant="subtitle1" fontWeight="600">
                        {role.name}
                    </Typography>
                    {role.key !== 'admin' && (
                        <Stack direction="row" spacing="10px">
                            <Button
                                className={'btn'}
                                size="small"
                                variant="contained"
                                color="warning"
                                onClick={(event) =>
                                    onPermissionEdit(event, role?.id)
                                }
                            >
                                Редактировать
                            </Button>

                            {role.key !== 'basic' && (
                                <Button
                                    className={'btn'}
                                    size="small"
                                    variant="contained"
                                    color="error"
                                    onClick={(event) =>
                                        onRoleDelete(event, role.id)
                                    }
                                >
                                    Удалить
                                </Button>
                            )}
                        </Stack>
                    )}
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                <Divider />
                <Table>
                    <TableHead>
                        <TableCell>Добавленные пользователи</TableCell>
                        <TableCell align="right">
                            <Button
                                className={'btn'}
                                size="small"
                                color={'primary'}
                                variant="contained"
                                onClick={(event) =>
                                    onHandleGrant(event, role?.id)
                                }
                            >
                                Добавить пользователя
                            </Button>
                        </TableCell>
                    </TableHead>
                    <TableBody>
                        {role.users?.length === 0 && (
                            <TableRow>
                                <TableCell>
                                    <Typography
                                        variant="subtitle2"
                                        color="ActiveBorder"
                                    >
                                        Пользователи с такой ролью не найдены
                                    </Typography>
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        )}

                        {role?.users?.map((user: any) => (
                            <TableRow key={user.name}>
                                <TableCell>
                                    <Typography variant="subtitle2">
                                        {user.name}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                        className={'btn'}
                                        size="small"
                                        color="error"
                                        variant="contained"
                                        onClick={(event) =>
                                            onHandleRevoke(
                                                event,
                                                role?.id,
                                                user?.id
                                            )
                                        }
                                    >
                                        Удалить
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </AccordionDetails>
        </Accordion>
    )
}

export default AccessAccordion
