const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const rateLimit = require('express-rate-limit');
const PORT = 5500;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

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

app.post('/api/callback',limiter, async (req, res) => {
    // Получаем данные из запроса
    try {
    console.log(req.body);
    const { name, phone, agreement, newsletter } = req.body;
    if(!name || !phone) {
        return res.status(400).json({ success: false, message: 'Недостаточно данных' });
    }
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

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});