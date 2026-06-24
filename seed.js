require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
    { name: 'Uvas Pasas', category: 'Frutos Secos', weight: '50 g', price: 1200, image: 'uvas-pasas.webp', stock: 50 },
    { name: 'Almendras', category: 'Frutos Secos', weight: '50 g', price: 3200, image: 'almendras.jpeg', stock: 50 },
    { name: 'Nuez', category: 'Frutos Secos', weight: '50 g', price: 3300, image: 'nuez.jpg', stock: 50 },
    { name: 'Pistacho', category: 'Frutos Secos', weight: '50 g', price: 3000, image: 'pistacho.jpg', stock: 50 },
    { name: 'Coco', category: 'Frutos Secos', weight: '50 g', price: 5200, image: 'coco.webp', stock: 50 },
    { name: 'Ciruela', category: 'Frutos Secos', weight: '50 g', price: 3200, image: 'ciruela.jpg', stock: 50 },
    { name: 'Chia', category: 'Semillas', weight: '50 g', price: 3900, image: 'chia.jpg', stock: 50 },
    { name: 'Mix Frutos Secos', category: 'Mix', weight: '50 g', price: 3780, image: 'mix-frutos-secos.webp', stock: 50 },
    { name: 'Haba', category: 'Semillas', weight: '50 g', price: 3200, image: 'haba.webp', stock: 50 },
    { name: 'Anis Estrellado', category: 'Semillas', weight: '50 g', price: 3200, image: 'anis-estrellado.webp', stock: 50 },
    { name: 'Canela', category: 'Semillas', weight: '50 g', price: 3200, image: 'canela.jpg', stock: 50 },
    { name: 'Ajonjoli', category: 'Semillas', weight: '50 g', price: 3200, image: 'ajonjoli.jpg', stock: 50 }
];

const runSeed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');
        await Product.deleteMany();
        await Product.insertMany(products);
        console.log(`🌱 ${products.length} products inserted successfully`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Seed error:', error.message);
        process.exit(1);
    }
};

runSeed();
