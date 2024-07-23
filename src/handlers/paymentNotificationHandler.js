const { Dish } = require("../db");
const mercadopago = require("mercadopago");

const paymentNotificationHandler = async (req, res) => {
  const paymentId = req.query["data.id"]; // Mercado Pago envía el id del pago en el campo 'data.id'

  try {
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        method: GET,
        headers: {
          Authorization: `Bearer ${ACCES_TOKEN_MP}`,
        },
      }
    );

    if (response.ok) {
      const paymentData = await response.json();
      const items = paymentData.additional_info.items;

      if (paymentData.status === "approved") {
        // Si el pago es aprobado, el stock se mantiene descontado
        console.log("Pago aprobado, mantener stock descontado.");
      } else {
        // Si el pago no es aprobado, restaurar el stock
        for (let item of items) {
          const dish = await Dish.findByPk(item.id);
          if (dish) {
            dish.stock += item.quantity;
            await dish.save();
          }
        }
        console.log("Pago no aprobado, stock restaurado.");
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error fetching payment info:", error);
    res.sendStatus(500);
  }
};

module.exports = { paymentNotificationHandler };
