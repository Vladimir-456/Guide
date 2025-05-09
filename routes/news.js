const express = require('express');
const router = express.Router();
const News = require('../model/News');

// Получить все новости
router.get('/', async (req, res) => {
    try {
        const newsData = await News.find().sort({ date: -1 });
        console.log(newsData);
        res.render('news', { newsData });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении новостей', error: error.message });
    }
});

// Получить одну новость
router.get('/:slug', async (req, res) => {
    try {
        const newsItem = await News.findOne({ slug: req.params.slug });
        if (newsItem) {
            const relatedNews = await News.find({ 
                _id: { $ne: newsItem._id } 
            })
            .sort({ date: -1 })
            .limit(3);
            res.render('news-detail', { newsItem, relatedNews });
        } else {
            res.status(404).send('News item not found');
        }
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении новости', error: error.message });
    }
});

module.exports = router;