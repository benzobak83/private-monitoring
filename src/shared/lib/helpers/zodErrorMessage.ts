export const zodErrorMessage = (error: string) => {
    return {
        required_error: error,
        invalid_type_error: error,
    }
}
