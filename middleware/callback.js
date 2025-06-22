const axios = require('axios');

const TELEGRAM_BOT_TOKEN = '8161506152:AAEyLE3R8IdcSDMvYmdxjtP_IgtqI8kQAMo';
const TELEGRAM_CHAT_ID = '-4618771405';

const callbackTelegramMessage = async (telegramMessage, res) => {
    if (!telegramMessage) {
        console.error('No message provided for Telegram');
        return res.status(400).json({
            success: false,
            message: 'No message provided'
        });
    }

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.log('Отправка в Telegram пропущена: отсутствуют токен или chat_id');
        return res.status(201).json({
            success: true,
            message: 'Заявка принята'
        });
    }

    try {
        await axios.post(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                chat_id: TELEGRAM_CHAT_ID,
                text: telegramMessage,
                parse_mode: 'Markdown'
            }
        );

        console.log('Сообщение успешно отправлено в Telegram');
        
        // return res.status(201).json({
        //     success: true,
        //     message: 'Заявка успешно отправлена'
        // });

    } catch (telegramError) {
        console.error('Ошибка отправки в Telegram:', telegramError);
        return res.status(201).json({
            success: true,
            message: 'Заявка принята, но возникла проблема с отправкой уведомления'
        });
    }
};

module.exports = { callbackTelegramMessage };