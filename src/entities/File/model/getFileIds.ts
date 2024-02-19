import { TFile } from './types'

export const getFileIds = (files: TFile[]) => files.map((file) => file.id)
