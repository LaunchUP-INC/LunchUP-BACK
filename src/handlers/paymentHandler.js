const { MercadoPagoConfig, Preference } = require("mercadopago");
const ACCESS_TOKEN =
  "APP_USR-4557230229916252-070822-0b4201cb69e6566164e980cd852a197f-1893931736";

const client = new MercadoPagoConfig({
  accessToken: ACCESS_TOKEN,
});

const paymentHandler = async (req, res) => {
  try {
    const items = req.body;
    const body = {
      items: items.map((item) => ({
        title: item.title,
        quantity: Number(item.quantity),
        unit_price: Number(item.unit_price),
        currency_id: "ARS",
      })),

      back_urls: {
        //urls reales https
        success: "http://localhost:5173/home",
        failure: "http://localhost:5173/",
      },
      auto_return: "approved",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({
      id: result.id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { paymentHandler };
