import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { IconButton, Stack } from '@mui/material'
import { FC } from 'react'
import {
    AnswerOption,
    useChecklistWorkItemStore,
} from '@entities/Settings/ChecklistWork'

type UploadedOptionsProps = {
    setAnswerOptionsIdsForDelete: React.Dispatch<React.SetStateAction<number[]>>
}

export const UploadedOptions: FC<UploadedOptionsProps> = ({
    setAnswerOptionsIdsForDelete,
}) => {
    const [checklistItem, setChecklistItem] = useChecklistWorkItemStore(
        (store) => store
    )

    const handleDeleteOption = (id: number) => () => {
        setAnswerOptionsIdsForDelete((prev) => [...prev, id])
        setChecklistItem({
            //после запроса удаления - в контексте checklistItem убираем удаленный элемент
            ...checklistItem,
            answerOptions: checklistItem.answerOptions.filter(
                (answer) => answer.id !== id
            ),
        })
    }
    return (
        <Stack>
            {checklistItem.answerOptions.map((option) => {
                return (
                    <Stack
                        direction="row"
                        alignItems={'center'}
                        spacing={0.2}
                        key={option.id}
                    >
                        <IconButton onClick={handleDeleteOption(option.id)}>
                            <DeleteForeverIcon color="error" />
                        </IconButton>
                        <AnswerOption
                            answerOption={option}
                            sx={{
                                width: '100%',
                                justifyContent: 'flex-start',
                            }}
                        />
                    </Stack>
                )
            })}
        </Stack>
    )
}
