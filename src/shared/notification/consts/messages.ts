export const MESSAGES_FOR_LOG = {
    success: {
        checklist: {
            sort: 'Порядок успешно изменён!',
        },
        file: {
            upload: 'Файл готов к сохранению',
            uploaded: 'Файл успешно загружен',
            dowland: 'Файл успешно скачан!',
            delete: 'Файл успешно удалён!',
        },
        object: {
            attachToChecklist: 'Объект успешно прикреплён к чеклисту осмотра',
            uploadedImg: 'Изображение успешно загружено!',
        },
        check: {
            completed: 'Проверка успешно выполнена!',
        },
        defect: {
            editPriority: 'Приоритет успешно изменён!',
        },
        default: 'Успешно!',
    },
    error: {
        default: 'Ошибка!',
        object: {
            state: {
                startInspection: 'Возможно, к объекту не привязан чеклист',
            },
        },
        form: {
            invalid: 'Некорректно заполнена форма!',
        },
        file: {
            dowland: 'Ошибка при скачивании файла!',
            delete: 'Ошибка при удалении файла!',
            upload: 'Ошибка при загрузке файла!',
        },
        material: {
            needMol:
                'Для получения списка материалов необходимо выбрать МОЛ в фильтре',
        },
    },
}
