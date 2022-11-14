import { Request, Response } from 'express';
import { handleHttp } from '../utils/error.handle';
import { Client } from 'whatsapp-web.js';
import * as QRCode  from 'qrcode';
import * as qrcode from 'qrcode-terminal';
import { generateClientWhatsapp } from './client';


const createClient = (req: Request, res: Response) => {
    try {
        const business: string = req.body.business as string || '';
        if (business == '') {
            handleHttp(res, 'ERROR_KEY_OBJECT_INVALID');
        }
        global.currentClient = generateClientWhatsapp(business)
        global.clientList.push(global.currentClient);
        res.send({ status: 200, message: 'Client created successfully', clientId: business.toLowerCase()});
    } catch (error) {
        handleHttp(res, 'ERROR_CREATE_CLIENT');
    }
};
const getClientById = (clientId: string) => {
    return global.clientList.map(session => {
        if(session.authStrategy.clientId === clientId) {
            return session;
        }
    })
};

const getQr = async (req: Request, res: Response) => {
    try {
        const clientId: string = req.body.business_id || '' as string;
        if (clientId == '') {
            handleHttp(res, 'ERROR_CLIENT_ID_NOT_FOUND');
        }
        global.currentClient = getClientById(clientId.toLowerCase())[0];
        global.currentClient.on('qr', (qr: string) => {
            QRCode.toDataURL(qr).then(url => {
                res.send(`
                <h2>QRCode Generated</h2>
                <div><img src='${url}'/></div>
              `);
              console.log('QR SENDED!');
            }).catch(err => {
                console.debug(err, 'error')
            })
        });
        global.currentClient.on('ready', () => {
            console.log('Client is ready!');
        });
        global.currentClient.initialize();
    } catch (error) {
        handleHttp(res, 'ERROR_GET_QR');
    }
};

const listenerReady = (client: Client) => {
    try {
        client.on('ready', () => {
            console.log('Client is ready!');
        });
    } catch (error) {
        console.log(`Ha ocurrido un error en listener---> ${error}`);
    }
};

const initializeClient = (client: Client) => {
    try {
        client.initialize();
    } catch (error) {
        console.log(`Ha ocurrido un error en initializer---> ${error}`);
    }
};

export { createClient, getQr, listenerReady, initializeClient, getClientById };