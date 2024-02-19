export const createFormDataByEvent = (event: React.ChangeEvent) => {
    const target = event.currentTarget as HTMLInputElement
    const files = target.files as FileList
    if (!files.length) return

    const formData = new FormData()
    ;[...files].forEach((file) => {
        formData.append('file', file)
    })

    return formData
}
