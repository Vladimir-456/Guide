function validateHandler(req, res, next) {
    const { name, phone } = req.body;
    const errors = [];
    if (!name) {
        errors.push('Имя обязательно для заполнения');
    } else if (name.length < 4) {
        errors.push('Имя должно содержать не менее 4 символов');
    }
    if(!phone) {
      errors.push('Телефон должен быть заполнен');
    }else {
        const phoneRegex = /^(\+7|7|8)[\s\-]?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
        if(!phoneRegex.test(phone)) {
          errors.push('Неверно введен номер телефона');
        }
    }
    if(errors.length > 0) {
        return res.status(400).json({ success: false, message: 'Ошибка валидации', errors:errors });
    }

    next();
}

module.exports = {
    validateHandler
};