import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Modal, Typography, SxProps, Theme } from '@mui/material'
import { FC, ReactNode, memo } from 'react'
import { TVoidFunc } from '../../../types/Global'
import { Loader } from '../../Loaders/Loader/Loader'
import { LoaderWrapper } from '../../Wrappers/LoaderWrapper/LoaderWrapper'

export type ModalProps = {
    open: boolean
    handleClose: TVoidFunc
    title: string
    children: ReactNode
    sx?: SxProps<Theme>
    loading?: boolean
    loadingWithBlockInterface?: boolean
}

export const style: SxProps<Theme> = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    maxHeight: '90vh',
    overflowY: 'auto',
    p: 3,
    borderRadius: '10px',
    border: 'none',
    textAlign: 'center',
}

export const MyModal: FC<ModalProps> = memo(
    ({
        open,
        handleClose,
        title,
        sx = {},
        children,
        loading = false,
        loadingWithBlockInterface = false,
    }) => {
        return (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, ...sx } as SxProps<Theme>}>
                    {loadingWithBlockInterface ? (
                        <Loader heightValue={100} />
                    ) : (
                        <LoaderWrapper loading={loading} relative={false}>
                            <Typography
                                variant="h2"
                                component="h2"
                                mr={6}
                                ml={6}
                            >
                                {title}
                            </Typography>
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
                            <Box sx={{ mt: 2 }}>{children}</Box>
                        </LoaderWrapper>
                    )}
                </Box>
            </Modal>
        )
    }
)
