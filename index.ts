import qrcode from 'qrcode-terminal';
import { Client, LocalAuth } from 'whatsapp-web.js';

import { MessageSpammer } from './models';
import { MainMenuResponse } from './types';
import { messageActions, mainMenuActions } from './utils';

const client = new Client({
  authStrategy: new LocalAuth({
    clientId: 'client-one',
  }),
});

let uiLoop = true;

client.initialize();

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
  console.log(
    'After scanning the QR code, please wait at least a minute for the session to be saved locally.'
  );
});

client.on('auth_failure', (msg) => {
  console.error('WHATSAPP WEB => Authentication failure', msg);
});

client.on('ready', async () => {
  while (uiLoop) {
    const { action } = await mainMenuActions();

    switch (action) {
      case MainMenuResponse.SendMessage:
        const { phoneNumber, message, timesToSend } = await messageActions();
        const messageSpammer = new MessageSpammer(
          phoneNumber,
          message,
          timesToSend
        );
        await messageSpammer.send(client);
        break;
      case MainMenuResponse.Logout:
        setTimeout(() => {
          process.exit(0);
        }, 2000);
        client.logout();
      case MainMenuResponse.Exit:
        process.exit(0);
      default:
        break;
    }
  }
});
