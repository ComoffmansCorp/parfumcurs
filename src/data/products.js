import placeholder from '../assets/images/placeholder.jpeg';
import sum from '../assets/images/sum.png';
import man from '../assets/images/man.png';
import prem from '../assets/images/prem.png';
import uni from '../assets/images/uni.png';
import wom from '../assets/images/wom.png';
import maison from '../assets/images/maison.png';
import lebo from '../assets/images/lebo.png'
import tomford from '../assets/images/tomford.jpeg'
import dolcheg from '../assets/images/dolchg.png'
import orchid from '../assets/images/orchid.jpeg'


const products = [{
        id: 1,
        name: "Velvet Orchid",
        brand: "Tom Ford",
        price: 12500,
        image: sum,
        rating: 4.8,
        gender: "women",
        volume: "50ml",
        type: "Oriental Floral",
        year: 2014,
        description: "Роскошный и чувственный аромат, который раскрывает редкую черную орхидею в сочетании с пряными нотами и сладкой ванилью. Идеально подходит для вечерних выходов и особых случаев.",
        scentPyramid: {
            top: ["Бергамот", "Мандарин", "Мед"],
            middle: ["Черная орхидея", "Жасмин", "Лотос"],
            base: ["Ваниль", "Сандал", "Мирра"]
        },
        collection: "luxury",
        isPopular: true
    },
    {
        id: 2,
        name: "Blue de Chanel",
        brand: "Chanel",
        price: 8900,
        image: man,
        rating: 4.9,
        gender: "men",
        volume: "100ml",
        type: "Woody Aromatic",
        year: 2010,
        description: "Воплощение современной мужественности. Свежий древесно-ароматический аккорд раскрывается гранями цитрусовых, ветивера и кедра, создавая элегантный и динамичный образ.",
        scentPyramid: {
            top: ["Грейпфрут", "Лимон", "Мята"],
            middle: ["Имбирь", "Жасмин", "Iso E Super"],
            base: ["Ветивер", "Кедр", "Ладан"]
        },
        collection: "luxury",
        isPopular: true
    },
    {
        id: 3,
        name: "Light Blue",
        brand: "Dolce&Gabbana",
        price: 6500,
        image: dolcheg,
        rating: 4.7,
        gender: "women",
        volume: "50ml",
        type: "Citrus Floral",
        year: 2001,
        description: "Свежий и легкий аромат, вдохновленный средиземноморским летом. Сочетание сицилийского лимона и зеленого яблока создает ощущение прохлады и беззаботности.",
        scentPyramid: {
            top: ["Сицилийский лимон", "Зеленое яблоко", "Колокольчик"],
            middle: ["Жасмин", "Бамбук", "Белая роза"],
            base: ["Кедр", "Амбра", "Мускус"]
        },
        collection: "summer",
        isPopular: true
    },
    {
        id: 4,
        name: "Aventus",
        brand: "Creed",
        price: 25000,
        image: prem,
        rating: 4.9,
        gender: "men",
        volume: "100ml",
        type: "Fruity Chypre",
        year: 2010,
        description: "Легендарный аромат, символизирующий силу, успех и видение. Фруктовые ноты сочетаются с дымным березовым аккордом, создавая неповторимый характерный шлейф.",
        scentPyramid: {
            top: ["Ананас", "Бергамот", "Черная смородина"],
            middle: ["Береза", "Пачули", "Марокканский жасмин"],
            base: ["Мускус", "Дубовый мох", "Ваниль"]
        },
        collection: "luxury",
        isPopular: true
    },
    {
        id: 5,
        name: "Santal 33",
        brand: "Le Labo",
        price: 18000,
        image: lebo,
        rating: 4.8,
        gender: "unisex",
        volume: "50ml",
        type: "Woody Aromatic",
        year: 2011,
        description: "Культовый аромат, построенный вокруг нот сандалового дерева. Дымный, пряный и кожаный аккорд создает ощущение уникальности и характера.",
        scentPyramid: {
            top: ["Кардамон", "Фиалка", "Ирис"],
            middle: ["Сандал", "Кедр", "Папирус"],
            base: ["Кожа", "Амбра", "Мускус"]
        },
        collection: "luxury",
        isPopular: true
    },
    {
        id: 6,
        name: "Beach Walk",
        brand: "Maison Margiela",
        price: 9900,
        image: maison,
        rating: 4.6,
        gender: "unisex",
        volume: "100ml",
        type: "Fresh Floral",
        year: 2012,
        description: "Воспоминание о летней прогулке по пляжу. Свежий и солёный аромат с нотами кокоса и иланг-иланга переносит в атмосферу беззаботного отдыха.",
        scentPyramid: {
            top: ["Бергамот", "Лимон", "Розовый перец"],
            middle: ["Иланг-иланг", "Кокос", "Гелиотроп"],
            base: ["Мускус", "Кедр", "Бензоин"]
        },
        collection: "summer"
    },
    {
        id: 7,
        name: "Black Orchid",
        brand: "Tom Ford",
        price: 15500,
        image: orchid,
        rating: 4.7,
        gender: "unisex",
        volume: "50ml",
        type: "Oriental Floral",
        year: 2006,
        description: "Таинственный и роскошный аромат с богатым букетом черной орхидеи, специй и темного шоколада. Создает ауру загадочности и соблазна.",
        scentPyramid: {
            top: ["Черный трюфель", "Иланг-иланг", "Черная смородина"],
            middle: ["Черная орхидея", "Специи", "Лотос"],
            base: ["Шоколад", "Пачули", "Ваниль"]
        },
        collection: "luxury",
        isPopular: true
    },
    {
        id: 8,
        name: "L'Eau d'Issey",
        brand: "Issey Miyake",
        price: 5900,
        image: wom,
        rating: 4.5,
        gender: "women",
        volume: "50ml",
        type: "Aquatic Floral",
        year: 1992,
        description: "Свежий акватический аромат, вдохновленный чистотой водопада. Цветочные ноты сочетаются с водными аккордами, создавая ощущение чистоты и свежести.",
        scentPyramid: {
            top: ["Лотос", "Дыня", "Розовая вода"],
            middle: ["Ландыш", "Пион", "Водяная лилия"],
            base: ["Тубероза", "Кедр", "Сандал"]
        },
        collection: "summer"
    },
    {
        id: 9,
        name: "Oud Wood",
        brand: "Tom Ford",
        price: 23000,
        image: tomford,
        rating: 4.8,
        gender: "unisex",
        volume: "50ml",
        type: "Woody Oriental",
        year: 2007,
        description: "Экзотический и роскошный аромат, построенный вокруг редкого агарового дерева. Сочетание специй и дымных нот создает атмосферу восточной роскоши.",
        scentPyramid: {
            top: ["Розовый перец", "Кардамон", "Китайский перец"],
            middle: ["Уд", "Сандал", "Ветивер"],
            base: ["Ваниль", "Бобы тонка", "Амбра"]
        },
        collection: "luxury"
    },
    {
        id: 10,
        name: "J'adore",
        brand: "Dior",
        price: 8900,
        image: placeholder,
        rating: 4.7,
        gender: "women",
        volume: "50ml",
        type: "Floral Fruity",
        year: 1999,
        description: "Элегантный цветочный аромат, воплощающий женственность и роскошь. Букет белых цветов дополняется фруктовыми нотами, создавая изысканную композицию.",
        scentPyramid: {
            top: ["Груша", "Бергамот", "Дыня"],
            middle: ["Жасмин", "Ландыш", "Роза"],
            base: ["Ваниль", "Мускус", "Амарант"]
        },
        collection: "luxury",
        isPopular: true
    }
];

export default products;