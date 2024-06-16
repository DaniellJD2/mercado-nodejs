import { config } from "dotenv";
config();

export const PORT = process.env.PORT;
export const HOST = `${process.env.HOST}:${PORT}`;
export const MERCADOPAGO_API_KEY = process.env.MERCADOPAGO_API_KEY;
