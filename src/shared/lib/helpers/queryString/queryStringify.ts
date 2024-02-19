import queryString from 'query-string'

export const queryStringify = (value: any) => {
    return queryString.stringify(value, { arrayFormat: 'bracket-separator' })
}
