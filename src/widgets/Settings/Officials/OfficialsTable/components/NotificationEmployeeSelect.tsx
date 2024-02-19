import { Chip, Stack, Typography } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'

export const NotificationEmployeeSelect: FC = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext()
    const [notifyUser, setNotifiyUser] = useState<{
        name: string
        id: number
        notify: boolean
    } | null>(null)

    const { update, replace } = useFieldArray({
        control,
        name: 'manager.[5].users',
    })

    console.log(errors)

    const employeesOPP = useWatch({ control, name: 'manager' })?.[5]
        ?.users as Array<typeof notifyUser>

    useEffect(() => {
        if (!employeesOPP?.length) return
        setNotifiyUser(employeesOPP.find((empl) => empl?.notify) || null)
    }, [employeesOPP])

    console.log(employeesOPP)

    const handleClick = (employee: any) => {
        setNotifiyUser(employee)
        if (!employee || !employeesOPP || !Array.isArray(employeesOPP)) return
        const updateArr = employeesOPP.map((user) =>
            user?.notify ? { ...user, notify: false } : user
        )

        replace(updateArr)

        const findIndex = employeesOPP.findIndex(
            (item) => item?.id === employee?.id
        )

        update(findIndex, { ...employee, notify: !employee.notify })
    }

    return (
        <Stack spacing={1} maxWidth={'650px'}>
            <Typography variant="h2">Уведомлять сотрудника ОПП</Typography>
            <Stack direction={'row'} gap={1} flexWrap={'wrap'}>
                {employeesOPP?.map((employee: any) => (
                    <Chip
                        label={employee.name}
                        key={employee.id}
                        variant={
                            notifyUser?.id === employee?.id
                                ? 'filled'
                                : 'outlined'
                        }
                        onClick={() => handleClick(employee)}
                        color="success"
                        clickable
                    />
                ))}
            </Stack>
        </Stack>
    )
}
