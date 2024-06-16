import express from "express";
import morgan from "morgan";
import path from "path";
import serverless from "serverless-http";

import paymentRoutes from "./routes/payment.routes.js";

const app = express();

app.use(morgan("dev"));

app.use(paymentRoutes);

app.use(express.static(path.resolve("src/public")));

app.use("/.netlify/functions/index", paymentRoutes);
export const handler = serverless(app);
