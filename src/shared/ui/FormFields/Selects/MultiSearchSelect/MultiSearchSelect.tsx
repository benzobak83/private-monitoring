import {
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    Stack,
    TextField,
} from '@mui/material'
import { AxiosResponse } from 'axios'
import { debounce } from 'lodash'
import { FC, memo, useCallback, useEffect, useRef, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import api from '../../../../api/api'
import { TAxiosMethods } from '../../../../api/types'
import { emitErrorLog } from '../../../../notification'
import { TAnyFunc, TIdWithLabel } from '../../../../types/Global'
import { RequiredSymbol } from '../../RequiredSymbol/RequiredSymbol'
import { SelectedOptions } from './SelectedOptions'

//TODO: на скорую руку компонент, нужно оптимизировать
type MultiSearchSelectProps = {
    searchUrl: string
    name: string
    label: string
    helperText?: string
    disabled?: boolean
    axiosMethod: TAxiosMethods
    required?: boolean
    getOptionLabel?: TAnyFunc
    getOptionValue?: TAnyFunc
    getData?: (data: AxiosResponse) => any
    defaultValue?: any[]
}

export const MultiSearchSelect: FC<MultiSearchSelectProps> = memo(
    ({
        searchUrl,
        name,
        label,
        axiosMethod,
        getData = (data: any) => data?.data?.data,
        getOptionLabel = (val: any) => val?.name,
        getOptionValue = (val: any) => val?.id,
        disabled = false,
        defaultValue = undefined,
        required,
        helperText,
        ...props
    }) => {
        const ref = useRef<HTMLElement>(null)

        const [currentValue, setCurrentValue] = useState()

        const { control, getValues, setValue } = useFormContext()
        const { append, remove } = useFieldArray({
            control,
            name,
        })

        const [options, setOptions] = useState<any[]>([])
        const [selectedOptions, setSelectedOptions] = useState<TIdWithLabel[]>(
            []
        )

        const [isClicked, setIsClicked] = useState<boolean>(false)
        const [isLoading, setIsLoading] = useState<boolean>(false)

        const searchFetch = useCallback(
            (text: string | void) => {
                setIsLoading(true)
                console.log(text)
                api[axiosMethod](searchUrl, { params: { query: text || ' ' } })
                    .then((data) => setOptions(getData(data)))
                    .finally(() => {
                        setIsLoading(false)
                    })
            },
            [axiosMethod, searchUrl, setOptions, getData]
        )

        const debouncedSearchFetch = debounce((text: string | void) => {
            searchFetch(text)
        }, 400)

        const handleChangeSearch = useCallback(
            (e: React.SyntheticEvent<Element, Event>, text: string) => {
                debouncedSearchFetch(text)
            },
            // eslint-disable-next-line react-hooks/exhaustive-deps
            []
        )

        const handleClick = useCallback(() => {
            if (isClicked) return

            setIsClicked(true)
        }, [setIsClicked, isClicked])

        const clearSelect = useCallback(() => {
            if (!ref.current) return

            const clearBtn = ref.current.querySelector(
                '.MuiAutocomplete-clearIndicator'
            ) as HTMLButtonElement

            clearBtn?.click()
        }, [])

        const addOption = () => {
            const formatedValue = getOptionValue(currentValue)
            if (!formatedValue) return

            if (getValues(name).includes(formatedValue)) {
                emitErrorLog(undefined, 'Данный вариант уже выбран!')
                return
            }

            append(formatedValue)
            setSelectedOptions((prev) => [
                ...prev,
                {
                    id: getOptionValue(currentValue),
                    label: getOptionLabel(currentValue),
                },
            ])
            clearSelect()
        }

        useEffect(() => {
            if (!isClicked) return

            searchFetch()
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isClicked])

        useEffect(() => {
            if (!defaultValue?.length) return setValue(name, [])

            defaultValue.forEach((val) => {
                const formatedValue = getOptionValue(val)
                append(formatedValue)
            })
            setSelectedOptions(
                defaultValue.map((val) => {
                    return {
                        id: getOptionValue(val),
                        label: getOptionLabel(val),
                    }
                })
            )

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [defaultValue])

        return (
            <Box>
                <Stack direction="row" spacing={1} alignItems="flex-start">
                    <Box
                        onClick={handleClick}
                        sx={{ width: '100%', position: 'relative' }}
                    >
                        {required && <RequiredSymbol />}
                        <Autocomplete
                            ref={ref}
                            options={options}
                            size="small"
                            loading={isLoading}
                            loadingText="Загрузка..."
                            getOptionLabel={(option) => getOptionLabel(option)}
                            onChange={(e, newValue) => {
                                setCurrentValue(newValue)
                            }}
                            noOptionsText="Нету совпадений"
                            filterOptions={(options) => options}
                            onInputChange={handleChangeSearch}
                            disabled={disabled}
                            {...props}
                            renderInput={(params) => (
                                <TextField
                                    onKeyDown={(event) => {
                                        event.stopPropagation()
                                    }}
                                    {...params}
                                    size={'small'}
                                    label={label}
                                    error={!!helperText}
                                    helperText={helperText}
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <>
                                                {isLoading ? (
                                                    <CircularProgress
                                                        color="inherit"
                                                        size={20}
                                                    />
                                                ) : null}
                                                {params.InputProps.endAdornment}
                                            </>
                                        ),
                                    }}
                                />
                            )}
                        />
                    </Box>

                    <Button
                        variant="contained"
                        color="success"
                        onClick={addOption}
                        sx={{ padding: '7px 16px' }}
                    >
                        Добавить
                    </Button>
                </Stack>
                <SelectedOptions
                    options={selectedOptions}
                    setSelectedOptions={setSelectedOptions}
                    remove={remove}
                />
            </Box>
        )
    }
)
