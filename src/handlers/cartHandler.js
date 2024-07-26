const { saveCart, loadCart } = require("../controllers/cartController");

const saveCartHandler = async (req, res) => {
  const { userId, cartItems } = req.body;

  try {
    await saveCart(userId, cartItems);
    res.status(200).send('Carrito guardado exitosamente');
  } catch (error) {
    res.status(500).send('Error al guardar el carrito');
  }
};

const loadCartHandler = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await loadCart(userId);

    if (!cart) {
      return res.status(404).json({ error: error.message })
    }
    
    res.status(200).json({ cart })
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  saveCartHandler,
  loadCartHandler
}