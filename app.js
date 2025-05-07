require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const nodemailer = require('nodemailer');
const TelegramBot = require('node-telegram-bot-api');
const rateLimit = require('express-rate-limit');

const { newsData, relatedNews } = require('./mokki/data');
const { reviewsData } = require('./mokki/mokki-reviews');
const { callbackTelegramMessage } = require('./middleware/callback');

const app = express();
const PORT = 5500;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const TELEGRAM_BOT_TOKEN = '8161506152:AAEyLE3R8IdcSDMvYmdxjtP_IgtqI8kQAMo';
const TELEGRAM_CHAT_ID = '-4618771405';

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Слишком много запросов с этого IP, пожалуйста, повторите попытку позже'
});

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

app.post('/api/application', async (req, res) => {
  const {additionalInfo, agreement, applicationType, diagnoses, email, fullName, howDidYouFindUs, mobility, phone, services} = req.body;
  console.log(services);
  const typesMapping = {
    'self': 'Для себя',
    'relative': 'Для родственников',
  }
  const mobilityMapping = {
    'independent': 'Самостоятельно передвигается',
    'assistance': 'Требуется помощь при передвижении',
    'wheelchair': 'Передвигается на коляске',
    'bedridden': 'Лежачий больной',
  }
  const didYouFindUsMapping = {
    'internet': 'Интернет',
    'social': 'Социальные сети',
    'friends': 'Рекомендации знакомых',
    'doctors': 'Направление врача',
    'other': 'Другое',
  }
  const servicesMapping = {
    'permanent': 'Постоянное проживание',
    'temporary': 'Временное проживание',
    'rehabilitation': 'Реабилитация после травм',
    'dementia': 'Уход при деменции',
    'hospice': 'Паллиативная помощь',
  }
  const typeText = typesMapping[applicationType] || 'Не указано';
  const mobilityText = mobilityMapping[mobility] || 'Не указана';
  const didYouFindUsText = didYouFindUsMapping[howDidYouFindUs] || 'Не указано';
  const servicesText = servicesMapping[services] || 'Не указано';
  console.log(servicesText);

  const telegramMessage = `Заполнение анкеты на сайте Опека:
  👤 ФИО: ${fullName}
  📱 Телефон: ${phone}
  📧 Email: ${email}
  📋 Тип заявки: ${typeText}
  🏥 Диагнозы: ${diagnoses || 'Не указаны'}
  🚶 Мобильность: ${mobilityText}
  🛠️ Необходимые услуги: ${servicesText}
  💬 Дополнительная информация: ${additionalInfo || 'Не указана'}
  ℹ️ Как нашли нас: ${didYouFindUsText}
  ✅ Согласие на обработку данных: ${agreement ? 'Да' : 'Нет'}`;

  callbackTelegramMessage(telegramMessage, res);
  // callbackTelegramMessage(telegramMessage, res);
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

app.post('/api/callback', limiter, async (req, res) => {
  try {
    const { name, phone, agreement, newsletter } = req.body;
      const telegramMessage = ` 
      🔔 *Новая заявка с сайта Опека* 
      👤 *Имя:* ${name} 
      📱 *Телефон:* ${phone} 
      📝 *Согласие на обработку данных:* ${agreement ? 'Да' : 'Нет'} 
      📨 *Подписка на рассылку:* ${newsletter ? 'Да' : 'Нет'} 
      🕒 *Дата заявки:* ${new Date().toLocaleString('ru-RU')} 
      `;
      await callbackTelegramMessage(telegramMessage, res);
      res.status(201).json({ success: true, message: 'Заявка принята' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера' });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
