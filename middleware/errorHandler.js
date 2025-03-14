
const errorHandler = (err, req, res, next) => {
    res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера' });
}

const notFound = (req, res, next) => {
    res.status(404).json({ success: false, message: 'Ресурс не найден' });
}

module.exports = { errorHandler, notFound }