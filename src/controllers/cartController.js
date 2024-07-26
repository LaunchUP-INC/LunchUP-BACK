const { Cart } = require("../db");

const saveCart = async (userId, cartItems) => {
    const savedCart = await Cart.upsert({ userId, items: cartItems });
    
    if (!savedCart) {
      throw new Error('Error al guardar el carrito');
    }
    return { status: 'success', message: 'Carrito guardado exitosamente' };
};

const loadCart = async (userId) => {
    const cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      throw new Error ('Carrito no encontrado')
    }
    
    return cart || [];
};

module.exports = {
  saveCart,
  loadCart
}

