module.exports = {
    plugins: [
        // Импорт CSS файлов
        require('postcss-import'),
        
        // Современные возможности CSS
        require('postcss-preset-env')({
            stage: 3, // Уровень поддержки новых возможностей CSS
            features: {
                'nesting-rules': true, // Вложенные правила
                'custom-media-queries': true, // Пользовательские медиа-запросы
                'custom-selectors': true, // Пользовательские селекторы
            }
        }),
        
        // Автоматическое добавление вендорных префиксов
        require('autoprefixer')({
            grid: true, // Поддержка CSS Grid
            flexbox: true, // Поддержка Flexbox
        }),
        
        // Минификация CSS
        require('cssnano')({
            preset: ['default', {
                discardComments: {
                    removeAll: true, // Удаление всех комментариев
                },
                normalizeWhitespace: true, // Нормализация пробелов
                colormin: true, // Минимизация цветов
                mergeRules: true, // Объединение правил
                discardDuplicates: true, // Удаление дубликатов
            }]
        })
    ]
}; 