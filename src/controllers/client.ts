import { Client, LocalAuth } from 'whatsapp-web.js';
import * as path from 'path';

const generateClientWhatsapp = (clientId: string) => new Client(
  {
    authStrategy: new LocalAuth(
        { 
          dataPath: path.join(__dirname, "..", ".wwebjs_auth"), clientId: clientId.toLowerCase() 
        }
      ), 
      puppeteer: { headless: true, args: ["--no-sandbox"] },
  }
  );

export { generateClientWhatsapp };