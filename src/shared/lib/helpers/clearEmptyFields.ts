import { isNull, isObject, isUndefined } from 'lodash'

//глубокое очищение массивов\объектов от '' | null | undefined || {}
export const clearEmptyFields = <T extends Record<string, any> | unknown[]>(
    data: T,
    exclusions: string[] = [],
    deleteClearObject: boolean = false
): T => {
    const result: any = structuredClone(data)

    Object.keys(result).forEach((key: any) => {
        //если ключ передан в виде исключения, то пропустить
        if (exclusions.length && exclusions.includes(key)) {
            return
        }
        //если значение поля объекта \ массива '' | null | undefined - удаляем
        if (
            result[key] === '' ||
            isUndefined(result[key]) ||
            isNull(result[key])
        ) {
            // у объекта поле удаляем, у массива удаляем элемент по индексу
            Array.isArray(result)
                ? result.splice(Number(key))
                : delete result[key]
        }
        //если значение является массива - прогонояем через эту же функцию, чтобы очистить '' | null | undefined
        if (Array.isArray(result[key])) {
            const clearArray = clearEmptyFields(result[key])
            result[key] = clearArray
        }
        //если значение является объектом - прогоняем через эту же функцию, чтобы очистить '' | null | undefined

        if (isObject(result[key])) {
            const clearObject = clearEmptyFields(result[key])
            //если в итоге получается пустой объект  - удаляем поле (если требуется deleteClearObject)
            if (!Object.keys(clearObject).length && deleteClearObject) {
                delete result[key]
            } else {
                result[key] = clearObject
            }
        }
    })

    return result as T
}
