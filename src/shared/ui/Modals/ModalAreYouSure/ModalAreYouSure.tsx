import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Modal, Typography } from '@mui/material'
import { FC, memo } from 'react'
import { LoaderWrapper } from '../../Wrappers/LoaderWrapper/LoaderWrapper'

export type ModalAreYouSureProps = {
    open: boolean
    handleClose: () => void
    title?: string
    bodyText: string
    buttonText?: string
    handleClickButton?: (...args: any) => any
    form?: string
    loading?: boolean
}

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    borderRadius: '10px',
    border: 'none',
    textAlign: 'center',
}

export const ModalAreYouSure: FC<ModalAreYouSureProps> = memo(
    ({
        open,
        handleClose,
        title = 'Вы уверены?',
        bodyText,
        form,
        buttonText = 'Подтвердить',
        handleClickButton,
        loading = false,
    }) => {
        const closeModal = () => {
            setTimeout(() => {
                handleClose()
            }, 10)
        }

        return (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <LoaderWrapper loading={loading} relative={false}>
                        <Button
                            sx={{
                                position: 'absolute',
                                right: '10px',
                                top: '10px',
                            }}
                            onClick={handleClose}
                        >
                            <CloseIcon color={'error'} />
                        </Button>

                        <Typography variant="h2" component="h2">
                            {title}
                        </Typography>

                        <Typography sx={{ mt: 2 }}>{bodyText}</Typography>
                        <Box
                            sx={{
                                mt: 4,
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Button
                                variant="outlined"
                                onClick={handleClose}
                                color={'error'}
                                sx={{ mr: 2 }}
                            >
                                Отмена
                            </Button>
                            <Box>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    form={form || undefined}
                                    onClick={handleClickButton || closeModal}
                                >
                                    {buttonText}
                                </Button>
                            </Box>
                        </Box>
                    </LoaderWrapper>
                </Box>
            </Modal>
        )
    }
)
