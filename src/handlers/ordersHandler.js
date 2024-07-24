const { getOrders } = require("../controllers/ordersController");

const getOrdersHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await getOrders(id);

    if (!orders) {
      return res.status(404),json({ message: "Ordenes no encontradas" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: message.error });
  }
};

module.exports = { getOrdersHandler };