import { Box } from '@mui/material'
import { FC, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { EditOfficialsFormFields } from '@features/Settings/Officials/edit'
import { TypeManager } from '@entities/Dict'
import { TOfficial } from '@entities/Settings/Officials'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { GetSearchSelect } from '@shared/ui/FormFields/Selects/GetSearchSelect/GetSearchSelect'
import { MultiSearchSelect } from '@shared/ui/FormFields/Selects/MultiSearchSelect/MultiSearchSelect'

type EmployeeSelectProps = {
    official: TOfficial
}

export const EmployeeSelect: FC<EmployeeSelectProps> = ({ official }) => {
    const {
        setValue,
        formState: { errors },
    } = useFormContext<EditOfficialsFormFields>()

    useEffect(() => {
        setValue(`manager.${official.id - 1}.key`, official.key)
        setValue(`manager.${official.id - 1}.name`, official.name)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (official.key === TypeManager.EMPLOYEE_OOP) {
        return (
            <Box sx={{ padding: '7px', width: '100%' }}>
                <MultiSearchSelect
                    axiosMethod="get"
                    searchUrl={ENDPOINTS.helpers.select.user}
                    name={`manager.${official.id - 1}.users`}
                    helperText={
                        errors?.manager?.[official.id - 1]?.users?.message
                    }
                    label="Сотрудник"
                    getOptionValue={(item) => {
                        if (item?.notify) {
                            return {
                                name: item.name,
                                id: item.id,
                                notify: item.notify,
                            }
                        }
                        return {
                            name: item.name,
                            id: item.id,
                            notify: false,
                        }
                    }}
                    defaultValue={official.users || []}
                />
            </Box>
        )
    }

    return (
        <Box sx={{ padding: '7px', width: '100%' }}>
            <GetSearchSelect
                defaultValue={official.users?.[0]}
                searchUrl={ENDPOINTS.helpers.select.user}
                helperText={
                    errors?.manager?.[official.id - 1]?.users?.[0]?.message
                }
                name={`manager.${official.id - 1}.users.0`}
                label="Сотрудник"
                getOptionValue={(item) => {
                    return {
                        name: item.name,
                        id: item.id,
                    }
                }}
            />
        </Box>
    )
}
