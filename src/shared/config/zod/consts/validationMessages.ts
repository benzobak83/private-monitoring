export const VALIDATION_MESSAGES = {
    required: 'Поле обязательно для заполнения',
    invalid_date: 'Некорректно указана дата',
    invalid_answers_count: 'Чеклист выполнен не полностью',
    invalid_limitation_date:
        'Укажите корректную дату или выберите до полного исполнения',
    minLength: (length: number) => `Мин. количество символов - ${length}`,
    minValue: (value: number) => `Мин. значение - ${value}`,
}
