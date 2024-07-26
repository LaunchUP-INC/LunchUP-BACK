const { MercadoPagoConfig, Preference } = require("mercadopago");
require("dotenv").config();
const { ACCESS_TOKEN_MP, FRONT_URL } = process.env;
const { Dish, Order } = require("../db");

const client = new MercadoPagoConfig({
  accessToken: ACCESS_TOKEN_MP,
});

const paymentHandler = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "ID del usuario");
    const { items, totalAmount } = req.body;
    console.log("ESTOS SON LOS ITEMS", items, totalAmount);
    // Verificar stock disponible

    for (let item of items) {
      console.log("ESTE ES EL ID DEL DISH QUE QUIERO COMPRAR", item.id);
      const dish = await Dish.findByPk(item.id);
      console.log("ESTE ES EL DISH QUE QUIERO COMPRAR", dish);
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

    const newOrder = await Order.create({
      UserId: id,
      items,
      totalPrice: totalAmount,
      status: "pending",
    });

    // Crear la preferencia de pago
    const body = {
      items: items.map(item => ({
        title: item.title,
        quantity: Number(item.quantity),
        unit_price: Number(item.unit_price),
        currency_id: "ARS",
        id: item.id
      })),
      back_urls: {
        success: `${FRONT_URL}/payment-success`,
        failure: `${FRONT_URL}/payment-error`,
      },
      auto_return: "approved",
      notification_url: "https://lunchup-back.onrender.com/payNotification",
      external_reference: newOrder.id,
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });

    // Responder con el ID de la preferencia creada
    res.json({
      id: result.id,
      orderId: newOrder.id,
    });
  } catch (error) {
    console.error("Error creating payment preference:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { paymentHandler };
