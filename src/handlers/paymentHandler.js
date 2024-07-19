const { MercadoPagoConfig, Preference } = require("mercadopago");
require("dotenv").config();
const { ACCESS_TOKEN_MP, FRONT_URL } = process.env;
const { Dish } = require("../db");

const client = new MercadoPagoConfig({
  accessToken: ACCESS_TOKEN_MP,
});

const paymentHandler = async (req, res) => {
  try {
    const items = req.body;

    // Verificar stock disponible
    for (let item of items) {
      const dish = await Dish.findByPk(item.id);
      if (!dish || dish.stock < item.quantity) {
        return res
          .status(400)
          .json({ error: `Stock insuficiente para el plato ${item.title}` });
      }
    }

    // Descontar temporalmente el stock
    for (let item of items) {
      const dish = await Dish.findByPk(item.id);
      dish.stock -= item.quantity;
      await dish.save();
    }

    // Crear la preferencia de pago
    const body = {
      items: items.map((item) => ({
        title: item.title,
        quantity: Number(item.quantity),
        unit_price: Number(item.unit_price),
        currency_id: "ARS",
      })),
      back_urls: {
        success: `${FRONT_URL}/shopping`,
        failure: `${FRONT_URL}/shopping`,
      },
      auto_return: "approved",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });

    // Responder con el ID de la preferencia creada
    res.json({
      id: result.id,
    });
  } catch (error) {
    console.error("Error creating payment preference:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { paymentHandler };
