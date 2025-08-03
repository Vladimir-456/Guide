module.exports = {
    plugins: [
        // Импорт CSS файлов
        require('postcss-import'),
        
        // Современные возможности CSS
        require('postcss-preset-env')({
            stage: 3, 
            features: {
                'nesting-rules': true, 
                'custom-media-queries': true, 
                'custom-selectors': true, 
            }
        }),
        
        // Автоматическое добавление вендорных префиксов
        require('autoprefixer')({
            grid: true, 
            flexbox: true, 
        }),
        
        // Минификация CSS
        require('cssnano')({
            preset: ['default', {
                discardComments: {
                    removeAll: true, 
                },
                normalizeWhitespace: true, 
                colormin: true,
                mergeRules: true, 
                discardDuplicates: true, 
            }]
        })
    ]
}; 