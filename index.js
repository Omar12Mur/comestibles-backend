require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Conectado a MongoDB'))
    .catch((error) => console.error('❌ Error:', error.message));

app.use('/api/products', require('./routes/products.routes'));
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/cart', require('./routes/cart.routes'));
app.use('/api/orders', require('./routes/orders.routes'));

app.get('/api/health', (req, res) => { res.json({ message: 'Server running correctly' }); });
app.use((req, res) => { res.status(404).json({ message: 'Route not found' }); });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`🚀 Server running on http://localhost:${PORT}`); });
