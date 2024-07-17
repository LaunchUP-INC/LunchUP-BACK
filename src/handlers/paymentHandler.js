const { MercadoPagoConfig, Preference } = require("mercadopago");
require("dotenv").config();
const { ACCESS_TOKEN_MP, FRONT_URL } = process.env;

const client = new MercadoPagoConfig({
  accessToken: ACCESS_TOKEN_MP,
});

const paymentHandler = async (req, res, next) => {
  try {
    const items = req.body;
    const body = {
      items: items.map(item => ({
        title: item.title,
        quantity: Number(item.quantity),
        unit_price: Number(item.unit_price),
        currency_id: "ARS",
      })),

      back_urls: {
        success: `${FRONT_URL}/home`,
        failure: `${FRONT_URL}`,
      },
      auto_return: "approved",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({
      id: result.id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { paymentHandler };
