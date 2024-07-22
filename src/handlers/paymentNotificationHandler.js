// const { Dish } = require("../db");
// const mercadopago = require("mercadopago");

// const paymentNotificationHandler = async (req, res) => {
//   try {
//     const payment = req.body;

//     // Verifica el estado del pago
//     if (
//       payment.action === "payment.created" ||
//       payment.action === "payment.updated"
//     ) {
//       const paymentId = payment.data.id;
//       // Consulta el estado del pago en MercadoPago
//       const paymentResult = await mercadopago.payment.findById(paymentId);

//       if (paymentResult.body.status === "approved") {
//         // Si el pago es aprobado, el stock se mantiene descontado
//         return res.sendStatus(200);
//       } else {
//         // Si el pago no es aprobado, restaura el stock
//         const items = paymentResult.body.additional_info.items;
//         for (let item of items) {
//           const dish = await Dish.findByPk(item.id);
//           dish.stock += item.quantity;
//           await dish.save();
//         }
//       }
//     }
//     res.sendStatus(200);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = { paymentNotificationHandler };
