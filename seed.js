require('dotenv').config();
const mongoose = require('mongoose');
const News = require('./model/News');
const connectDB = require('./config/database');

// Контент для первой новости
const contentText = `
  <b>Многие люди сталкиваются с проблемой, кому доверить опеку над престарелым человеком, если планируется отдохнуть на море или в санатории.</b> 
  <br>Наличие пожилого члена семьи – не повод отказываться от заслуженного отпуска. <br>Психологи настоятельно рекомендуют родственникам, ухаживающим за больными и беспомощными стариками, периодически устраивать себе передышку. 
  <br>Иначе не уберечься от эмоциональных срывов и физического переутомления. Ведь уход за больными стариками требует внимания и ответственности. 
  <br>Но куда пристроить пожилого человека на время отпуска? Рассмотрим несколько вариантов решения, их.
  <br><b>Присмотр близких людей.</b>
  <br>Оставить ненадолго пожилого человека можно на попечение родственников, соседей, друзей. Чем хорош такой вариант? Дедушка или бабушка останутся в привычной обстановке, под присмотром знакомых людей. Получив подробные разъяснения, временный опекун будет выполнять назначения, а в случае затруднений всегда сможет связаться с детьми и внуками старика.
  <br>При отпуске не более 10 дней родня не будет ощущать опеку как тяжкое бремя. Но отсутствие близких в течение месяца вызывает недовольство. Ситуация осложняется, если престарелый человек страдает деменцией, психическими проблемами. От ухаживающего потребуется эмоциональная устойчивость, терпение, знание особенностей болезни, умение успокоить больного.
  <br>Помощник, который совмещает уход и ежедневную работу на производстве или в офисе, ухаживать за больным сможет только в свободное время. Это неудобно и для него, и для подопечного. Ведь пожилой человек нуждается в постоянной заботе, а родственник не всегда сможет находиться рядом.
  <br><b>Услуги сиделки.</b>
  <br>Что делать, когда нет возможности поручить уход за пожилым человеком друзьям или соседям? На время отпуска можно нанять профессиональную сиделку. Большинство, чтобы уберечься от недобросовестных помощников, ищут патронажную сестру через знакомых или специальные агентства.
  К найму сиделки необходимо подойти с особым вниманием:
  ознакомиться с отзывами и рекомендациями бывших работодателей;
  узнать, с какими подопечными ей приходилось работать;
  уточнить, имеет ли сиделка медицинское образование.
  Патронажная сестра может быть приходящей, или её нанимают с проживанием, если пенсионеру требуется пошаговая помощь. Для приходящей сиделки составляют график посещения подопечного, заключают договор, в котором указывают все обязанности.
  Недостаток такого решения проблемы – приходиться оставлять близкого с незнакомым человеком. Даже договор не станет гарантией того, что ваш дедушка и сиделка найдут взаимопонимание и сойдутся характерами.`;

const newsData = [
    {
        title: 'Куда определить пожилого человека на время отпуска',
        shortContent: 'Служба питания наших пансионатов продолжает совершенствовать меню, ориентируясь на запросы проживающих и советы медицинских специалистов.',
        content: {
            sections: [
                {
                    type: 'heading',
                    text: 'Присмотр близких людей'
                },
                {
                    type: 'paragraph',
                    text: 'Оставить ненадолго пожилого человека можно на попечение родственников, соседей, друзей. Чем хорош такой вариант? Дедушка или бабушка останутся в привычной обстановке, под присмотром знакомых людей. Получив подробные разъяснения, временный опекун будет выполнять назначения, а в случае затруднений всегда сможет связаться с детьми и внуками старика.'
                },
                {
                    type: 'paragraph',
                    text: 'При отпуске не более 10 дней родня не будет ощущать опеку как тяжкое бремя. Но отсутствие близких в течение месяца вызывает недовольство. Ситуация осложняется, если престарелый человек страдает деменцией, психическими проблемами. От ухаживающего потребуется эмоциональная устойчивость, терпение, знание особенностей болезни, умение успокоить больного.'
                },
                {
                    type: 'heading',
                    text: 'Услуги сиделки'
                },
                {
                    type: 'paragraph',
                    text: 'Что делать, когда нет возможности поручить уход за пожилым человеком друзьям или соседям? На время отпуска можно нанять профессиональную сиделку. Большинство, чтобы уберечься от недобросовестных помощников, ищут патронажную сестру через знакомых или специальные агентства.'
                },
                {
                    type: 'list',
                    items: [
                        'ознакомиться с отзывами и рекомендациями бывших работодателей',
                        'узнать, с какими подопечными ей приходилось работать',
                        'уточнить, имеет ли сиделка медицинское образование'
                    ]
                }
            ]
        },
        image: '../img/67413990-15e5-50a2-ac07-e403ffc6238a.jpeg',
        date: new Date('2024-06-27'),
        isPublished: true,
        slug: 'kuda-opredelit-pozhilogo-cheloveka-na-vremya-otpuska'
    },
    {
        title: 'Опека поможет студентам в разработке инклюзивных навыков для голосового помощника Алиса',
        shortContent: 'Компания Опека расширяет сеть своих центров и открывает новое учреждение в Санкт-Петербурге, оснащенное современным оборудованием.',
        content: {
            sections: [
                {
                    type: 'heading',
                    text: 'Новое направление'
                },
                {
                    type: 'paragraph',
                    text: 'Компания Опека расширяет сеть своих центров и открывает новое учреждение в Санкт-Петербурге, оснащенное современным оборудованием.'
                },
                {
                    type: 'heading',
                    text: 'Инновационный подход'
                },
                {
                    type: 'paragraph',
                    text: 'Мы активно внедряем новые технологии для улучшения качества жизни наших подопечных.'
                }
            ]
        },
        image: '../img/n1ob9x79o3bl2okklp70mjthzppn9gh9.jpg',
        date: new Date('2024-06-27'),
        isPublished: true,
        slug: 'opeka-pomozhet-studentam-v-razrabotke-inklyuzivnyh-navykov'
    },
    {
        title: 'Опека открывает новый пансионат на 85 мест',
        shortContent: 'Компания Опека расширяет сеть своих центров и открывает новое учреждение в Санкт-Петербурге, оснащенное современным оборудованием.',
        content: {
            sections: [
                {
                    type: 'heading',
                    text: 'Новый пансионат'
                },
                {
                    type: 'paragraph',
                    text: 'Компания Опека расширяет сеть своих центров и открывает новое учреждение в Санкт-Петербурге, оснащенное современным оборудованием.'
                },
                {
                    type: 'heading',
                    text: 'Улучшенные условия'
                },
                {
                    type: 'paragraph',
                    text: 'Новый пансионат предлагает комфортные условия проживания и профессиональный уход за пожилыми людьми.'
                }
            ]
        },
        image: '../img/3c9a90ee8909d4da43137b2a45fe7df9.jpeg',
        date: new Date('2024-05-28'),
        isPublished: true,
        slug: 'opeka-otkryvaet-novyy-pansionat-na-85-mest'
    }
];

const seedDatabase = async () => {
    try {
        // Подключение к базе данных
        await connectDB();
        console.log('Подключение к базе данных установлено');

        // Очистка существующих данных
        await News.deleteMany({});
        console.log('База данных очищена');

        // Добавление новых данных
        const createdNews = await News.insertMany(newsData);
        console.log(`Добавлено ${createdNews.length} новостей`);

        // Закрытие соединения
        await mongoose.connection.close();
        console.log('Соединение с базой данных закрыто');

    } catch (error) {
        console.error('Ошибка при заполнении базы данных:', error);
        process.exit(1);
    }
};

// Запуск заполнения базы данных
seedDatabase();