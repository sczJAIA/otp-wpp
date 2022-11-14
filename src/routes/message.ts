import { Router} from "express";
import { sendOTP } from "../controllers/message";
const router = Router();

router.post('/otp', sendOTP);
export {router};