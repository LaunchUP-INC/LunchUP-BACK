const { getStockDish, updateStock } = require('../controllers/stockController');

const getStockHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const stock = await getStockDish(id);
    res.status(200).json({ stock });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const putStockHandler  = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const updatedStock = await updateStock(id, quantity);
    res.status(200).json({ stock: updatedStock });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getStockHandler,
  putStockHandler
}