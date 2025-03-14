const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const { Pool } = require('pg');
const { validateHandler } = require('./middleware/validate');
const {errorHandler, notFound} = require('./middleware/errorHandler');
const { newsData } = require('./mokki/data');
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

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'callbacks',
    password: '12',
    port: 5432
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/news/:id', (req, res) => {
  const newsItem = newsData.find(item => item.id === parseInt(req.params.id));
  if (newsItem) {
    res.render('news-detail', { newsItem });
  } else {
    res.status(404).send('News item not found');
  }
})

app.get('/news', (req, res) => {
  res.render('news', { newsData });
});

app.get('/reviews/:id', (req, res) => {
  const reviewItem = reviewsData.find(item => item.id === parseInt(req.params.id));
  if (reviewItem) {
    res.render('reviews-detail', { reviewItem });
  } else {
    res.status(404).send('Review item not found');
  }
})

app.post('/api/callback', validateHandler,limiter, async (req, res) => {
    // Получаем данные из запроса
    try {
    const { name, phone, agreement, newsletter } = req.body;

    const result = await pool.query(
        'INSERT INTO callbacks (name, phone, agreement, newsletter) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, phone, agreement, newsletter]
    );
    // Отправка успешного ответа
    res.status(201).json({ success: true, message: 'Заявка успешно отправлена', data: result.rows[0]}); 
    }
    catch(error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Произошла ошибка при обработке заявки' });
    }
});

app.use(errorHandler);

app.use(notFound);


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});