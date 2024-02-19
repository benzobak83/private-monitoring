import { Box, Divider, Stack } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { EditPriorityBtn } from '@/features/Defect/editPriority'
import {
    $defect,
    DefectInformation,
    DefectStages,
    DefectTimeline,
    getDefectFx,
    resetDefect,
} from '@entities/Defect'
import { ROUTES } from '@shared/lib/consts/routes'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { useInit } from '@shared/lib/hooks/useInit'
import { LoadingLinear } from '@shared/ui/Loaders/LoaderLinear/LoaderLinear'
import { WidgetLoading } from '@shared/ui/Loaders/WidgetLoading/WidgetLoading'
import { TitlePage } from '@shared/ui/TitlePage/TitlePage'
import { DefectBreadcrumbs } from './components/DefectBreadcrumbs'

const DefectCardLayout: FC = () => {
    const defect = useStore($defect)

    const [timelineFullMode, setTimelineFullMode] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    const { init } = useInit()

    const { id } = useDefaultParams()

    useEffect(() => {
        setLoading(true)
        getDefectFx(id).finally(() => setLoading(false))
    }, [id])

    useEffect(() => {
        return () => resetDefect()
    }, [])

    if (loading && init) {
        return <WidgetLoading label="Загрузка карточки неисправности..." />
    }
    return (
        <Box>
            <DefectBreadcrumbs />
            <Box mt={0.5}>
                {loading && <LoadingLinear />}
                <Stack direction="row" spacing={2}>
                    <TitlePage backUrl={ROUTES.defect.general}>
                        Неисправность № {defect.id}
                    </TitlePage>
                    <Divider orientation="vertical" flexItem />
                    <DefectStages stage={defect?.stage?.id} />
                </Stack>
                <Stack direction={'row'} spacing={2} mt={2}>
                    <Stack spacing={1} sx={{ flex: '0 1 36%' }}>
                        {!timelineFullMode && (
                            <DefectInformation
                                defect={defect}
                                editPriorityRenderProp={(priority) => (
                                    <EditPriorityBtn priority={priority} />
                                )}
                            />
                        )}

                        <DefectTimeline
                            fullMode={timelineFullMode}
                            setFullMode={setTimelineFullMode}
                        />
                    </Stack>
                    <Box sx={{ flex: '0 1 63%' }}>
                        <Outlet />
                    </Box>
                </Stack>
            </Box>
        </Box>
    )
}

export default DefectCardLayout
