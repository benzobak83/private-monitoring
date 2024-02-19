import {
    Autocomplete,
    AutocompleteProps,
    Box,
    CircularProgress,
    TextField,
} from '@mui/material'
import { AxiosResponse } from 'axios'
import { debounce, isNull } from 'lodash'
import {
    FC,
    memo,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import api from '../../../../api/api'
import { TResponse } from '../../../../api/types'
import { TAnyFunc } from '../../../../types/Global'
import { RequiredSymbol } from '../../RequiredSymbol/RequiredSymbol'

export type GetSearchSelectProps = {
    searchUrl: string
    searchParams?: Record<string, unknown>
    name: string
    label: string
    helperText?: string
    disabled?: boolean
    required?: boolean
    getOptionLabel?: TAnyFunc
    queryForDefaultValue?: (arg: string | number) => Promise<TResponse<unknown>>
    handleChange?: (
        e: React.SyntheticEvent<Element, Event>,
        newValue: any
    ) => any
    getOptionValue?: TAnyFunc
    withoutResearch?: boolean
    getData?: (data: AxiosResponse) => any
    clearAfterChange?: boolean
    defaultValue?: any
} & Omit<
    AutocompleteProps<unknown, any, any, any>,
    'helperText' | 'options' | 'renderInput' | 'getOptionLabel'
>

//TODO: никак не могу ассинхроно подставить inputLabel, накостылял, нужно придумать другой способ
export const GetSearchSelect: FC<GetSearchSelectProps> = memo(
    ({
        searchUrl,
        searchParams = {},
        name,
        label,
        getData = (data: any) => data?.data?.data,
        getOptionLabel = (val: any) => val?.name,
        getOptionValue = (val: any) => val?.id,
        disabled = false,
        defaultValue = undefined,
        withoutResearch = false,
        required,
        handleChange,
        clearAfterChange = false,
        helperText,
        ...props
    }) => {
        const ref = useRef<HTMLElement>(null)

        const [isLoading, setIsLoading] = useState<boolean>(false)
        const [options, setOptions] = useState<any[]>([])
        const [isClicked, setIsClicked] = useState<boolean>(false)
        const [myDefaultValue, setMyDefaultValue] = useState<any>(null)
        const [myDefaultValueIsLoading, setMyDefaultValueIsLoading] =
            useState<boolean>(false)
        const [initSearchCompleted, setInitSearchCompleted] =
            useState<boolean>(false)

        const { setValue, control } = useFormContext()

        const value = useWatch({ control, name })

        const searchFetch = useCallback(
            (text: string | void) => {
                if (initSearchCompleted && withoutResearch) return

                setIsLoading(true)
                setInitSearchCompleted(true)

                api.get(searchUrl, {
                    params: { query: text || ' ', ...searchParams },
                })
                    .then((data) => setOptions(getData(data)))
                    .finally(() => {
                        setIsLoading(false)
                    })
            },
            [
                searchUrl,
                setOptions,
                getData,
                searchParams,
                withoutResearch,
                initSearchCompleted,
            ]
        )

        const debouncedSearchFetch = useMemo(
            () =>
                debounce((text: string | void) => {
                    searchFetch(text)
                }, 400),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            []
        )

        const handleChangeSearch = useCallback(
            (e: React.SyntheticEvent<Element, Event>, text: string) => {
                if (!isClicked) return
                debouncedSearchFetch(text)
            },
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [isClicked]
        )

        const clearSelect = useCallback(() => {
            if (!ref.current) return

            const clearBtn = ref.current.querySelector(
                '.MuiAutocomplete-clearIndicator'
            ) as HTMLButtonElement

            clearBtn?.click()
        }, [])

        const handleClick = useCallback(() => {
            if (isClicked) return

            setIsClicked(true)
        }, [setIsClicked, isClicked])

        const handleChangeSelect = useCallback(
            (e: React.SyntheticEvent<Element, Event>, value: any) => {
                handleChange && handleChange(e, value)

                clearAfterChange &&
                    queueMicrotask(() => {
                        clearSelect()
                    })
            },
            [clearAfterChange, clearSelect, handleChange]
        )

        useEffect(() => {
            if (!isClicked) return

            searchFetch()
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isClicked])

        useEffect(() => {
            if (defaultValue === value) {
                return setMyDefaultValue(false)
            }

            if (typeof defaultValue === 'undefined' || isNull(defaultValue)) {
                setValue(name, null)
                return setMyDefaultValue(false)
            }

            if (typeof defaultValue === 'object') {
                setMyDefaultValue(defaultValue)
                return setValue(name, getOptionValue(defaultValue))
            }

            if (
                typeof defaultValue === 'string' ||
                typeof defaultValue === 'number'
            ) {
                setMyDefaultValueIsLoading(true)
                api.get(searchUrl, {
                    params: { query: defaultValue || ' ', ...searchParams },
                })
                    .then((data) => {
                        const result = getData(data)?.[0]
                        setMyDefaultValue(result)
                        setValue(name, getOptionValue(result))
                    })

                    .catch(() => {
                        setMyDefaultValue(false)
                    })
                    .finally(() => {
                        setMyDefaultValueIsLoading(false)
                    })

                return
            }
            setMyDefaultValue(false)
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [defaultValue])

        if (myDefaultValueIsLoading) {
            return (
                <Box sx={{ width: '100%', position: 'relative' }}>
                    <TextField
                        label={label}
                        size="small"
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <>
                                    <CircularProgress
                                        color="inherit"
                                        size={20}
                                    />
                                </>
                            ),
                        }}
                    />
                </Box>
            )
        }

        if (isNull(myDefaultValue) && !!defaultValue) return <div />

        return (
            <Box
                onClick={handleClick}
                sx={{ width: '100%', position: 'relative' }}
            >
                {required && <RequiredSymbol />}
                <Controller
                    name={name}
                    control={control}
                    render={({ field: { onChange: controllerOnChange } }) => (
                        <Autocomplete
                            ref={ref}
                            options={options}
                            filterOptions={(options) => options}
                            size="small"
                            onClose={() => setIsClicked(false)}
                            loading={isLoading}
                            loadingText="Загрузка..."
                            getOptionLabel={(option) => getOptionLabel(option)}
                            onChange={(e, newValue) => {
                                handleChangeSelect(e, newValue)

                                return controllerOnChange(
                                    getOptionValue(newValue) || null
                                )
                            }}
                            noOptionsText="Нету совпадений"
                            defaultValue={myDefaultValue || null}
                            onInputChange={handleChangeSearch}
                            disabled={disabled}
                            {...props}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    size={'small'}
                                    label={label}
                                    error={!!helperText}
                                    helperText={helperText}
                                    onKeyDown={(event) => {
                                        event.stopPropagation()
                                    }}
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
                    )}
                />
            </Box>
        )
    }
)
