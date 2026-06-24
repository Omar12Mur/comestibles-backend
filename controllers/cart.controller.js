const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });
        res.json(cart);
    } catch (error) { res.status(500).json({ message: 'Error getting cart', error: error.message }); }
};

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        if (product.stock < quantity) return res.status(400).json({ message: `Only ${product.stock} units available` });
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });
        const existingItem = cart.items.find((item) => item.product.toString() === productId);
        if (existingItem) { existingItem.quantity += quantity; }
        else { cart.items.push({ product: productId, quantity }); }
        await cart.save();
        await cart.populate('items.product');
        res.json(cart);
    } catch (error) { res.status(400).json({ message: 'Error adding to cart', error: error.message }); }
};

const updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        const { productId } = req.params;
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        const item = cart.items.find((i) => i.product.toString() === productId);
        if (!item) return res.status(404).json({ message: 'Product not in cart' });
        if (quantity <= 0) { cart.items = cart.items.filter((i) => i.product.toString() !== productId); }
        else { item.quantity = quantity; }
        await cart.save();
        await cart.populate('items.product');
        res.json(cart);
    } catch (error) { res.status(400).json({ message: 'Error updating cart', error: error.message }); }
};

const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        cart.items = cart.items.filter((i) => i.product.toString() !== productId);
        await cart.save();
        await cart.populate('items.product');
        res.json(cart);
    } catch (error) { res.status(500).json({ message: 'Error removing from cart', error: error.message }); }
};

const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (cart) { cart.items = []; await cart.save(); }
        res.json({ message: 'Cart cleared successfully' });
    } catch (error) { res.status(500).json({ message: 'Error clearing cart', error: error.message }); }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
