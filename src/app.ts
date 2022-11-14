import "dotenv/config"
import express from 'express';
import cors from 'cors';
import {router } from './routes'
import { generateClientWhatsapp } from "./controllers/client";
import * as qrcode from 'qrcode-terminal';

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
global.clientList = [];
app.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`))


