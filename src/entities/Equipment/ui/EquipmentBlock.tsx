import { Stack, Button } from '@mui/material'
import { FC, ReactNode, useState } from 'react'
import { MyPaperWithoutBoxContainer } from '@shared/ui/Wrappers/MyPaper/MyPaperWithoutBoxContainer'

type EquipmentBlockProps = {
    firstStateSlot: { element: ReactNode; name: string }
    secondStateSlot: { element: ReactNode; name: string }
    title: string
    animation?: string
}

type TBlockState = 'first' | 'second'

export const EquipmentBlock: FC<EquipmentBlockProps> = ({
    firstStateSlot,
    secondStateSlot,
    title,
    animation,
}) => {
    const [state, setState] = useState<TBlockState>('first')

    const getVariant = (btnType: TBlockState) => {
        return state === btnType ? 'contained' : 'outlined'
    }

    return (
        <MyPaperWithoutBoxContainer
            title={title}
            sx={{
                flex: '0 1 50%',
                height: '34vh',
                animation,
            }}
            rightContent={
                <Stack direction="row" spacing={1}>
                    <Button
                        variant={getVariant('first')}
                        onClick={() => setState('first')}
                    >
                        {firstStateSlot.name}
                    </Button>
                    <Button
                        variant={getVariant('second')}
                        onClick={() => setState('second')}
                    >
                        {secondStateSlot.name}
                    </Button>
                </Stack>
            }
        >
            {state === 'first' && <> {firstStateSlot.element}</>}
            {state === 'second' && <> {secondStateSlot.element}</>}
        </MyPaperWithoutBoxContainer>
    )
}
