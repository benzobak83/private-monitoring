Архитектура проекта: FSD (https://feature-sliced.design/ru/docs/get-started/overview)

Подключён eslint для внедрения ограничений FSD(взял с их сайта)

Тонкости\неинтуитивщина:

1. Все таблицы решил создавать в widgets, чтобы было легче ориентироваться
2. Создал слой layouts, куда помещаю все layouts (норм практика, методолгия размышляет над оффициальным внедрением данного слоя)
3. entitie Filter - контролеры в виде "засетать фильтр" и "сбросить" находятся на уровне сущности в виде исключения, иначе в каждом виджете фильтра пришлось бы слотом передавать эти контролеры
