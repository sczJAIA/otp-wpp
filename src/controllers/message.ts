import { Request, Response } from 'express';
import { Client, WAState, Message } from 'whatsapp-web.js';
import { getClientById } from './auth';

const getState = async (client: Client) => {
    const state = await client.getState();
    return state === WAState.CONNECTED;
};

const isRegisteredUser = async(phone: string) => {
    return await global.currentClient.isRegisteredUser(`${phone}@c.us`)
};

const getFormattedNumber = (req: Request, res: Response) => {};

const sendMessageF = async (phone: string, message: string, clientId: string) => {
        global.currentClient = getClientById(clientId.toLowerCase())[0];
        const state = await getState(global.currentClient);
        if (state) {
            const registered = await isRegisteredUser(phone);
            if (registered) {
                const responseMessage: Message = await global.currentClient.sendMessage(`${phone}@c.us`, message);
                if (responseMessage.id.fromMe) {
                    return (true);
                }
                return (false);
            }
            return (false);
        }
        return false;
};

const sendOTP = async (req: Request, res: Response) => {
    const phone: string = req.body.phone || '' as string;
    const business_id: string = req.body.business_id || '';
    const business_name: string = req.body.business_name || '';
    if (phone === '' || business_id === '' || business_name === '') {
        return res.send({status: 400, message: 'Bad Request'});
    }
    const otp = generateOTP().toString();
    const messageOtp = `*${otp}* Es tu codigo de verificación de ${business_name}`;
    const responseMessage  = await sendMessageF(phone, messageOtp, business_id);
    if (responseMessage) {
        return res.send({ status: 200, message: `Message successfully sent to ${phone}`, otp: otp })
    }
    return res.send({ status: 404, message: `${phone} is not a whatsapp user` });
};

const generateOTP = () => {
    let max = 999999;
    let min = 100000;
    return Math.floor(Math.random() * (max - min) + min);
};


export { sendOTP };