require("dotenv").config();
const { Dish, Order } = require("../db");
require("dotenv").config();
const axios = require("axios");

const { ACCESS_TOKEN_MP } = process.env;

const paymentNotificationHandler = async (req, res) => {
  const paymentId = req.query["data.id"]; // Mercado Pago envía el id del pago en el campo 'data.id'
  console.log("ESTE ES EL PAYMENTId", paymentId);
  if (paymentId) {
    try {
      const response = await axios.get(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN_MP}`,
          },
        },
      );
  
        const paymentData = await response.data;
        const items = paymentData.additional_info.items;
        const orderId = paymentData.external_reference;
  
        const order = await Order.findByPk(orderId);

        console.log(JSON.stringify(items))
  
        if (paymentData.status === "approved") {
          // Si el pago es aprobado, el stock se mantiene descontado
          order.status = "approved";
          console.log("Pago aprobado, mantener stock descontado.");
        } else {
          // Si el pago no es aprobado, restaurar el stock
          order.status = "rejected";
          for (let item of items) {
            const dish = await Dish.findByPk(item.id);
            if (dish) {
              dish.stock += item.quantity;
              await dish.save();
            }
          }
          console.log("Pago no aprobado, stock restaurado.");
        }
  
        await order.save();
      
      res.sendStatus(200);
    } catch (error) {
      console.error("Error fetching payment info:", error);
      res.sendStatus(500);
    }
  }
};

module.exports = { paymentNotificationHandler };
