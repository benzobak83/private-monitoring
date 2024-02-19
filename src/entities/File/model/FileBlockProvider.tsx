import createFastContext from '@shared/lib/helpers/createFastContext'
import { TFile } from './types'

type FileBlockContext = {
    loadedfiles: TFile[]
    filesForUploading: TFile[]
}

export const { Provider: FileBlockProvider, useStore: useFileBlockStore } =
    createFastContext<FileBlockContext>({
        loadedfiles: [],
        filesForUploading: [],
    })
