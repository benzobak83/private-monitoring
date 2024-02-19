import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Typography } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, useEffect, useState } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { pickActOfMaterial } from '@/features/Defect/pickActOfMaterial/model/pickActOfMaterial'
import {
    $defect,
    DefectStageIds,
    useCompletingWorkContext,
} from '@entities/Defect'
import {
    $materialsActs,
    TMaterialsAct,
    TMaterialsActOfObjectByCompletingId,
    getMaterialsActOfObjectByCompletingIdFx,
    getMaterialsActs,
} from '@entities/Material'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { MySwitch } from '@shared/ui/FormFields/MySwitch/MySwitch'
import { DefaultSelect } from '@shared/ui/FormFields/Selects/DefaultSelect/DefaultSelect'
import { Loader } from '@shared/ui/Loaders/Loader/Loader'
import { MyButton } from '@shared/ui/MyButton/MyButton'
import { WriteOffMattertialsFormFields, formSchema } from './formSchema'
import { WriteOffMattertialsView } from './WriteOffMattertialsView'

export const WriteOffMattertialsForm: FC = () => {
    const materialsActs = useStore($materialsActs)
    const defect = useStore($defect)

    const [
        materialsActOfObjectByCompletingId,
        setMaterialsActOfObjectByCompletingId,
    ] = useState<TMaterialsActOfObjectByCompletingId>(
        {} as TMaterialsActOfObjectByCompletingId
    )

    const { completingWork } = useCompletingWorkContext()

    const { id } = useDefaultParams()

    const [pickActOfMaterialIsLoading, setPickActOfMaterialIsLoading] =
        useState<boolean>(false)
    const [
        getMaterialsActOfObjectByCompletingIdFxIsLoading,
        setGetMaterialsActOfObjectByCompletingIdFxIsLoading,
    ] = useState<boolean>(false)

    const formMethods = useForm<WriteOffMattertialsFormFields>({
        resolver: zodResolver(formSchema),
    })

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = formMethods

    const onSubmit = (data: WriteOffMattertialsFormFields) => {
        setPickActOfMaterialIsLoading(true)
        const actOfMaterial = Object.values(materialsActs).find(
            (act) => act.uuid === data.act
        ) as TMaterialsAct

        const filteredData = {
            ...actOfMaterial,
            executionId: completingWork.id,
            withoutAct: data.withoutAct,
        }
        pickActOfMaterial({
            data: filteredData,
            id,
        })
            .then(() => {
                return getMaterialsActOfObjectByCompletingIdFx({
                    malfunctionId: id,
                    executionId: completingWork.id,
                })
            })
            .then((res) => {
                setMaterialsActOfObjectByCompletingId(res.data.data)
            })
            .finally(() => {
                setPickActOfMaterialIsLoading(false)
            })
    }

    const withoutAct = useWatch({ control, name: 'withoutAct' })

    const onOpenSelect = () => {
        if (materialsActs?.length) return

        getMaterialsActs()
    }

    useEffect(() => {
        if (!!Object.keys(materialsActOfObjectByCompletingId || {}).length)
            return

        setGetMaterialsActOfObjectByCompletingIdFxIsLoading(true)
        getMaterialsActOfObjectByCompletingIdFx({
            malfunctionId: id,
            executionId: completingWork.id,
        })
            .then((res) => {
                setMaterialsActOfObjectByCompletingId(res.data.data)
            })
            .finally(() => {
                setGetMaterialsActOfObjectByCompletingIdFxIsLoading(false)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, completingWork.id])

    if (getMaterialsActOfObjectByCompletingIdFxIsLoading) {
        return <Loader heightValue={20} />
    }

    if (materialsActOfObjectByCompletingId?.number) {
        return (
            <WriteOffMattertialsView
                materialAct={materialsActOfObjectByCompletingId}
            />
        )
    }

    if (
        defect?.stage?.id === DefectStageIds.COMPLETED &&
        !materialsActOfObjectByCompletingId?.number
    ) {
        return <Typography variant="h6">Без акта</Typography>
    }
    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={1}>
                    <Typography variant="h6">
                        Выберите акт списания материалов для привязки к работам
                        по этой неисправности:
                    </Typography>
                    <DefaultSelect
                        label="Акт"
                        options={Object.values(materialsActs)}
                        getOptionValue={(option: TMaterialsAct) => option.uuid}
                        getOptionLabel={(option: TMaterialsAct) =>
                            `Акт ${option.number} от ${option.date} на сумму ${option.sum}`
                        }
                        name="act"
                        helperText={errors.act?.message}
                        defaultValue={withoutAct ? null : undefined}
                        disabled={withoutAct}
                        onOpen={() => onOpenSelect()}
                    />
                    <MySwitch label="Без акта" name="withoutAct" />
                </Stack>
                <MyButton
                    isLoading={pickActOfMaterialIsLoading}
                    variant="contained"
                    sx={{ width: 'fit-content', mt: 2 }}
                    type="submit"
                >
                    Сохранить
                </MyButton>
            </form>
        </FormProvider>
    )
}
