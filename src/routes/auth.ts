import { Router } from "express";
import { createClient, getQr } from '../controllers/auth'

const router = Router();


router.post('/', createClient);
router.post('/getQR', getQr);


export {router};