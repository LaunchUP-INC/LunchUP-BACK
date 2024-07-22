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
    // SI PAGO ESTA OK

    if (paymentResult.body.status === "approved") {
      // Si el pago es aprobado, el stock se mantiene descontado
      return res.sendStatus(200);
    } else {
      // Si el pago no es aprobado, restaura el stock
      const items = paymentResult.body.additional_info.items;
      for (let item of items) {
        const dish = await Dish.findByPk(item.id);
        dish.stock += item.quantity;
        await dish.save();
      }
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
        success: `${FRONT_URL}/payment-success`,
        failure: `${FRONT_URL}/payment-error`,
      },
      auto_return: "approved",
      notification_url: "https://lunchup-back.onrender.com/payNotification",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });
    console.log("aca esta el resultado", result, result.id);

    // Responder con el ID de la preferencia creada
    res.json({
      id: result.id,
    });
  } catch (error) {
    console.error("Error creating payment preference:", error);
    res.status(500).json({ error: error.message });
  }
};

const paymentNotificationHandler = async (req, res) => {
  const paymentId = req.query.id;

  try {
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        method: `GET`,
        headers: {
          Authorization: `Bearer ${client.accessToken}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(`Error:`, error);
    res.sendStatus(500);
  }
};
module.exports = { paymentHandler, paymentNotificationHandler };
