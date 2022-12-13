import { Seller } from "../models/sellerModel.js"
import { Client } from "../models/clientModel.js"
import { Tea } from "../models/teaModel.js"

export default async (req, res) => {
    await Seller.deleteMany();
    await Seller.insertMany([myAdmin, myModerator, mySeller])
    await Client.deleteMany();
    await Client.insertMany([Guigui])
    await Tea.deleteMany();
    await Tea.insertMany([Hammam, London, Yunnan, Rooibos])
    res.redirect("/");
}

// ---------------------------------------- //
const myAdmin = new Seller({
    login: "admin",
    password: "admin",
    email: "admin@admin.com",
    firstname: "adminPrénom",
    lastname: "adminNom",
    rights: [{
        isAdmin: true,
        isModerator: true
    }]
})
const myModerator = new Seller({
    login: "moderator",
    password: "moderator",
    email: "moderator@moderator.com",
    firstname: "moderatorPrénom",
    lastname: "moderatorNom",
    rights: [{
        isAdmin: false,
        isModerator: true
    }]
})
const mySeller = new Seller({
    login: "seller",
    password: "seller",
    email: "seller@seller.com",
    firstname: "sellerPrénom",
    lastname: "sellerNom",
    rights: [{
        isAdmin: false,
        isModerator: false
    }]
})

// ---------------------------------------- //
const Guigui = new Client({
    login: "Guigui",
    email: "guigui@thegoat.world",
    password: "iamthegoat",
    login: "Guigui",
    address: {
        firstname: "Guillaume",
        lastname: "Thegoat",
        streetNumber: "123",
        addInfo: "bis",
        streetName: "rue du OverTheTop",
        postalCode: 67000,
        city: "Strasbourg",
    },
    phone: "0102030405",
    goldMember: true,
})

// ---------------------------------------- //
const Hammam = new Tea({
    name: "Thé du Hammam",
    ref: "1234567",
    image: "https://www.palaisdesthes.com/media/catalog/product/cache/50708da259540eeb20337bcdb367a3c9/8/5/856-42179-qxdc1uhw78.jpg",
    origin: "Colombie",
    category: "Thé vert",
    description: `Le Thé du Hammam est l'un des thés les plus appréciés de Palais des Thés.
Gourmand et fruité, le Thé du Hammam est inspiré d'une recette traditionnelle turque. Son parfum évoque la datte verte, la fleur d'oranger, la rose et les fruits rouges.
Il est agrémenté, dans la plus pure tradition orientale, de pétales de fleurs. Sa fragrance extraordinaire naît de la subtile association du thé vert de Chine, réputé pour sa fraîcheur et ses vertus désaltérantes, et des parfums gourmands des fruits.
Le saviez-vous ? 1 thé du hammam est vendu toutes les 2 minutes dans le monde !`,
    detail: "Ce thé aux notes fleuries et fruitées s'associe avec finesse et équilibre à l'onctuosité du chocolat blanc.",
    unitPrice: 8.99,
    bagSize: [{ size: 100, reducePrice: 0.2 },
    { size: 500, reducePrice: 0.4 },
    { size: 1000, reducePrice: 0.6 }
    ],

    reviews: [{
        note: 5,
        author: "Guigui",
        date: 1670254900,
        content: "Trop bon le hammam Frère !",
    }],

    stock: [{ bagSize: 100, quantity: 126 },
    { bagSize: 500, quantity: 255 },
    { bagSize: 1000, quantity: 100 }
    ],

    isDiscounted: false,
    isGrandCru: true,
    isNewProduct: true,
    isBestSeller: false,
    isFavorite: true,
})
const London = new Tea({
    name: "Green of London",
    ref: "1236789",
    image: "https://www.palaisdesthes.com/media/catalog/product/cache/50708da259540eeb20337bcdb367a3c9/8/5/856-42179-qxdc1uhw78.jpg",
    origin: "Chine",
    category: "Thé vert",
    description: `Green of London est un Earl Grey d'exception, qui associe un délicat thé vert de Chine à des notes fraîches de bergamote. Un mélange remarquable d'équilibre et de finesse.
Le Earl Grey est un grand classique anglais, depuis que Charles Grey, comte (earl en anglais) de Falodon et Ministre des Affaires étrangères du Royaume britannique au milieu du XIXème siècle, reçut d’un mandarin chinois une vieille recette consistant à aromatiser son thé avec de la bergamote.`,
    detail: "L’alliance parfaite entre un délicat thé vert de Chine et des notes fraîches de bergamote. Un Earl Grey d’une finesse rare.",
    unitPrice: 12.99,
    bagSize: [{ size: 100, reducePrice: 0.2 },
    { size: 500, reducePrice: 0.4 },
    { size: 1000, reducePrice: 0.6 }
    ],

    reviews: [{
        note: 5,
        author: "Guigui",
        date: 1670254900,
        content: "Au chiotte les anglais !",
    }],

    stock: [{ bagSize: 100, quantity: 100 },
    { bagSize: 500, quantity: 300 },
    { bagSize: 1000, quantity: 26 }
    ],

    isDiscounted: true,
    isGrandCru: false,
    isNewProduct: false,
    isBestSeller: false,
    isFavorite: false,
})
const Yunnan = new Tea({
    name: "Grand Yunnan impérial",
    ref: "1236789",
    image: "https://www.palaisdesthes.com/media/catalog/product/cache/50708da259540eeb20337bcdb367a3c9/8/5/856-42179-qxdc1uhw78.jpg",
    origin: "Chine",
    category: "Thé vert",
    description: `Fleuri et miellé, le grand caractère et la subtilité de ce thé lui valent le nom de "Moka des thés" ou "thé des chirurgiens", car il réveille sans énerver. Feuille superbe, avec beaucoup de bourgeons dorés. Un des "must" de Palais des Thés.
Le Grand Yunnan Impérial est le thé d'origine le plus apprécié de Palais des Thés. Il a converti un grand nombre de buveurs de café et remplace avantageusement le café en début de journée.`,
    detail: "Dénommé « thé des chirurgiens », car il réveille sans énerver, ce thé au parfum miellé est idéal le matin.",
    unitPrice: 15.99,
    bagSize: [{ size: 100, reducePrice: 0.2 },
    { size: 500, reducePrice: 0.5 },
    { size: 1000, reducePrice: 0.8 }
    ],

    reviews: [{
        note: 5,
        author: "Guigui",
        date: 1670255900,
        content: "Miam miam !",
    }],

    stock: [{ bagSize: 100, quantity: 12 },
    { bagSize: 500, quantity: 234 },
    { bagSize: 1000, quantity: 56 }
    ],

    isDiscounted: true,
    isGrandCru: false,
    isNewProduct: false,
    isBestSeller: false,
    isFavorite: false,
})
const Rooibos = new Tea({
    name: "Rooibos des Lords",
    ref: "1236999",
    image: "https://www.palaisdesthes.com/media/catalog/product/cache/50708da259540eeb20337bcdb367a3c9/8/5/856-42179-qxdc1uhw78.jpg",
    origin: "Afrique du Sud",
    category: "Rooibos",
    description: `Palais des Thés décline son Earl Grey favori, le Thé des Lords, sur une base de Rooibos. Une recette qui associe harmonieusement la puissance citronnée de la bergamote à la rondeur du Rooibos.
Naturellement sans théine, il est idéal le soir pour les inconditionnels d'Earl Grey.`,
    detail: "Dénommé « thé des chirurgiens », car il réveille sans énerver, ce thé au parfum miellé est idéal le matin.",
    unitPrice: 9.99,
    bagSize: [{ size: 100, reducePrice: 0.1 },
    { size: 500, reducePrice: 0.5 },
    { size: 1000, reducePrice: 0.8 }
    ],

    reviews: [{
        note: 5,
        author: "Guigui",
        date: 1670255900,
        content: "Ouille ça pique les épines!",
    }],

    stock: [{ bagSize: 100, quantity: 56 },
    { bagSize: 500, quantity: 34 },
    { bagSize: 1000, quantity: 12 }
    ],

    isDiscounted: false,
    isGrandCru: false,
    isNewProduct: false,
    isBestSeller: true,
    isFavorite: false,
})