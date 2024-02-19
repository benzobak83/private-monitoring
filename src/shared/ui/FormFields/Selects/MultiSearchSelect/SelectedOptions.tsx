import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import {
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
} from '@mui/material'
import { FC, Fragment, memo } from 'react'
import { UseFieldArrayRemove } from 'react-hook-form'
import { TIdWithLabel } from '../../../../types/Global'

type SelectedOptionsProps = {
    options: TIdWithLabel[]
    setSelectedOptions: React.Dispatch<React.SetStateAction<TIdWithLabel[]>>
    remove: UseFieldArrayRemove
}

export const SelectedOptions: FC<SelectedOptionsProps> = memo(
    ({ options, setSelectedOptions, remove }) => {
        const handleRemoveOption = (id: number | string, index: number) => {
            setSelectedOptions((prev) => prev.filter((item) => item.id != id))
            remove(index)
        }

        return (
            <List dense={true} sx={{ mt: -0.5 }}>
                {options.map((option, i) => {
                    return (
                        <Fragment key={option.id}>
                            <ListItem
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() =>
                                            handleRemoveOption(option.id, i)
                                        }
                                        color="error"
                                        data-modal-type="deleteChecklist"
                                    >
                                        <DeleteForeverIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText
                                    primary={`${i + 1}. ${option.label}`}
                                />
                            </ListItem>
                            <Divider orientation="horizontal" flexItem />
                        </Fragment>
                    )
                })}
            </List>
        )
    }
)
