require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const { testConnection } = require('./config/database');
const { sequelize} = require('./models/index');
const { Callback } = require('./models/callback');
const { validateHandler } = require('./middleware/validate');
const {errorHandler, notFound} = require('./middleware/errorHandler');
const { newsData, relatedNews } = require('./mokki/data');
const { reviewsData } = require('./mokki/mokki-reviews');

const app = express();
const rateLimit = require('express-rate-limit');
const PORT = 5500;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Слишком много запросов с этого IP, пожалуйста, повторите попытку позже'
});

const transporter = nodemailer.createTransport({
  service: 'mail.ru',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
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
    
    // Создаем запись через Sequelize
    const newCallback = await Callback.create({
      name,
      phone,
      agreement,
      newsletter
    });
    
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TARGET,
        subject: 'Новая заявка с сайта Опека',
        html: `
        <h2>Поступила новая заявка</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Согласие на обработку данных:</strong> ${agreement ? 'Да' : 'Нет'}</p>
        <p><strong>Подписка на рассылку:</strong> ${newsletter ? 'Да' : 'Нет'}</p>
        <p><strong>Дата заявки:</strong> ${new Date().toLocaleString('ru-RU')}</p>
      `
      };

      await transporter.sendMail(mailOptions);
      
      // Отправляем ответ только один раз, после успешной отправки email
      res.status(201).json({ 
        success: true, 
        message: 'Заявка успешно отправлена', 
        data: newCallback
      });
      
    } catch (emailError) {
      console.error('Ошибка отправки email:', emailError);
      // Заявка создана, но email не отправлен
      res.status(201).json({ 
        success: true, 
        message: 'Заявка принята, но возникла проблема с отправкой уведомления', 
        data: newCallback
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера' });
  }
});

app.use(errorHandler);

app.use(notFound);

const startServer = async () => {
    try {
      await testConnection();

      await sequelize.sync({ alter: true });
      console.log('Database synced successfully.');

      app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}!`);
    });
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  };

  startServer();
