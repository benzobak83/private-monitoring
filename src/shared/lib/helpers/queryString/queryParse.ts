import queryString from 'query-string'

export const queryParse = (string: string) => {
    return queryString.parse(string, {
        parseNumbers: true,
        parseBooleans: true,
        arrayFormat: 'bracket-separator',
    })
}
