require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const nodemailer = require('nodemailer');
const TelegramBot = require('node-telegram-bot-api');

const { validateHandler } = require('./middleware/validate');
const { newsData, relatedNews } = require('./mokki/data');
const { reviewsData } = require('./mokki/mokki-reviews');

const app = express();
const rateLimit = require('express-rate-limit');
const PORT = 5500;

const TELEGRAM_BOT_TOKEN = '8161506152:AAEyLE3R8IdcSDMvYmdxjtP_IgtqI8kQAMo';
const TELEGRAM_CHAT_ID = '-4618771405';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Слишком много запросов с этого IP, пожалуйста, повторите попытку позже'
});

const transporter = nodemailer.createTransport({
  service: 'mail.ru',
  auth: {
    user: 'babic34@mail.ru',
    pass: 'KdHAMKwavmJ9jfg3v0z4'
  }
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/news/:id', (req, res) => {
  const newsItem = newsData.find(item => item.id === parseInt(req.params.id));
  if (newsItem) {
    res.render('news-detail', { newsItem, relatedNews });
  } else {
    res.status(404).send('News item not found');
  }
})

app.get('/news', (req, res) => {
  res.render('news', { newsData });
});

app.get('/reviews', (req, res) => {
  res.render('reviews', { reviewsData });
})

app.get('/reviews/:id', (req, res) => {
  const reviewItem = reviewsData.find(item => item.id === parseInt(req.params.id));
  if (reviewItem) {
    res.render('reviews-detail', { reviewItem });
  } else {
    res.status(404).send('Review item not found');
  }
})
app.get('/promotion', (req, res) => {
  res.render('promotion');
})
app.post('/api/callback', validateHandler, limiter, async (req, res) => {
  try {
    const { name, phone, agreement, newsletter } = req.body;
    
    // Формируем сообщение для Telegram
    const telegramMessage = ` 
🔔 *Новая заявка с сайта Опека* 
👤 *Имя:* ${name} 
📱 *Телефон:* ${phone} 
📝 *Согласие на обработку данных:* ${agreement ? 'Да' : 'Нет'} 
📨 *Подписка на рассылку:* ${newsletter ? 'Да' : 'Нет'} 
🕒 *Дата заявки:* ${new Date().toLocaleString('ru-RU')} 
`;
    
    // Используем только один метод отправки - через axios
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      try {
        // Отправляем сообщение в Telegram через HTTP запрос
        await axios.post(
          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramMessage,
            parse_mode: 'Markdown'
          }
        );
        console.log('Сообщение успешно отправлено в Telegram');
        
        res.status(201).json({
          success: true,
          message: 'Заявка успешно отправлена',
        });
      } catch (telegramError) {
        console.error('Ошибка отправки в Telegram:', telegramError);
        // Даже если отправка в Telegram не удалась, мы всё равно принимаем заявку
        res.status(201).json({
          success: true,
          message: 'Заявка принята, но возникла проблема с отправкой уведомления',
        });
      }
    } else {
      console.log('Отправка в Telegram пропущена: отсутствуют токен или chat_id');
      res.status(201).json({
        success: true,
        message: 'Заявка принята',
      });
    }
  } catch (error) {
    console.error('Подробная ошибка:', error.message, error.stack);
    res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера' });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
