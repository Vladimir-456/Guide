import JustValidate from '../node_modules/just-validate/dist/just-validate.es.js';

export const initValidate = () => {
    try {
        const form = document.querySelector('#profile-modal__form');
        
        if (!form) {
            return null;
        }

        const validate = new JustValidate(form, {
            validateBeforeSubmitting: true,
            lockForm: true,
            focusInvalidField: true,
            errorFieldCssClass: 'is-invalid',
            successFieldCssClass: 'is-valid',
            errorLabelStyle: {
                color: '#ff0000',
            },
            tooltip: {
                position: 'top',
            },
        });

        validate
            .addField(form.querySelector('[name="fullName"]'), [
                {
                    rule: 'required',
                    errorMessage: 'Поле обязательно для заполнения'
                },
                {
                    rule: 'minLength',
                    value: 4,
                    errorMessage: 'Минимум 4 символа'
                },
                {
                    rule: 'maxLength',
                    value: 100,
                    errorMessage: 'Максимум 100 символов'
                }
            ])
            .addField(form.querySelector('[name="phone"]'), [
                {
                    rule: 'required',
                    errorMessage: 'Поле обязательно для заполнения'
                },
                {
                    validator: (value) => {
                        const phoneFormat = /^(\+7|8)[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
                        const isValid = phoneFormat.test(value);
                        return isValid;
                    },
                    errorMessage: 'Неверный формат телефона'
                }
            ])
            .addField(form.querySelector('[name="email"]'), [
                {
                    rule: 'required',
                    errorMessage: 'Поле обязательно для заполнения'
                },
                {
                    rule: 'email',
                    errorMessage: 'Неверный формат email'
                }
            ])
        return validate;
    } catch (error) {
        console.error('Error initializing form validation:', error);
        return null;
    }
}

export const initValidateCallback = () => {
    try{
        const form = document.querySelector('.modal__form');
        if(!form) {
            return null;
        }
        const validate = new JustValidate(form, {
            validateBeforeSubmitting: true,
            lockForm: true,
            focusInvalidField: true,
            errorFieldCssClass: 'is-invalid',
            successFieldCssClass: 'is-valid',
            errorLabelStyle: {
                color: '#ff0000',
            },
        });
        validate
            .addField(form.querySelector('[name="name"]'), [
                {
                    rule: 'required',
                    errorMessage: 'Поле обязательно для заполнения'
                },
                {
                    rule: 'minLength',
                    value: 3,
                    errorMessage: 'Минимум 3 символа'
                },
                {
                    rule: 'maxLength',
                    value: 50,
                    errorMessage: 'Максимум 100 символов'
                }
            ])
            .addField(form.querySelector('[name="phone"]'), [
                {
                    rule: 'required',
                    errorMessage: 'Поле обязательно для заполнения'
                },
                {
                    validator: (value) => {
                        const phoneFormat = /^(\+7|8)[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
                        const isValid = phoneFormat.test(value);
                        return isValid;
                    },
                    errorMessage: 'Неверный формат телефона'
                }
            ])
            .addField(form.querySelector('[name="agreement"]'), [
                {
                    rule: 'required',
                    errorMessage: 'Поле обязательно для заполнения'
                }
            ])
            return validate;
    }
    catch(error){
        console.error('Error initializing form validation:', error);
        return null;
    }
}
    


