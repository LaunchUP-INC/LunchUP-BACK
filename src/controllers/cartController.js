const { Cart } = require("../db");

const saveCart = async (userId, cartItems) => {
    let savedCart = await Cart.findOne({ where: { userId} });
    
    if (!savedCart) {
      savedCart = await Cart.create({ userId, items: cartItems });
    } else {
      savedCart.items = cartItems;
      await savedCart.save();
    }

    return { status: 'success', message: 'Carrito guardado exitosamente' };
};

const loadCart = async (userId) => {
    const cart = await Cart.findOne({ where: { userId } });
    
    return cart || [];
};

module.exports = {
  saveCart,
  loadCart
}

