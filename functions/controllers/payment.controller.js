import { MercadoPagoConfig, Preference } from "mercadopago";
import { MERCADOPAGO_API_KEY, HOST } from "../config.js";

export const createOrder = async (req, res) => {
  const client = new MercadoPagoConfig({ accessToken: MERCADOPAGO_API_KEY });
  const payment = new Preference(client);

  let preference = {
    items: [
      {
        title: "Laptop",
        quantity: 2,
        unit_price: 1000000,
        currency_id: "COP",
        image: "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
        description: "Dispositivo móvil de Tienda e-commerce",
      },
    ],
    notification_url: `${HOST}/webhook`,
    back_urls: {
      success: `${HOST}/success`,
      pending: `${HOST}/pending`,
      failure: `${HOST}/failure`,
    },
  };

  try {
    await payment
      .create({ body: preference })
      .then((resp) => res.status(200).send(resp))
      .catch(console.error);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const receiveWebhook = async (req, res) => {
  try {
    console.log(req);
    const payment = req.query;
    if (payment.type === "payment") {
      const data = await new Preference().get(payment.data.id);
      console.log(data);
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
