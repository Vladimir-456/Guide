const axios = require('axios');
require('dotenv').config();

const callbackTelegramMessage = async (telegramMessage, res) => {
    if (!telegramMessage) {
        console.error('No message provided for Telegram');
        return res.status(400).json({
            success: false,
            message: 'No message provided'
        });
    }

    if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
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
                chat_id: process.env.TELEGRAM_CHAT_ID,
                text: telegramMessage,
                parse_mode: 'Markdown'
            }
        );

    } catch (telegramError) {
        console.error('Ошибка отправки в Telegram:', telegramError);
        return res.status(201).json({
            success: true,
            message: 'Заявка принята, но возникла проблема с отправкой уведомления'
        });
    }
};

module.exports = { callbackTelegramMessage };