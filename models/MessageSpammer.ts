import { Client } from 'whatsapp-web.js';

import { defaultCountryCode } from '../config';

export class MessageSpammer {
  private ONE_SECOND = 1000;
  private PROCESSING_EXTRA_TIME = 50;

  /**
   * Initialize the MessageSpammer class
   * @param phoneNumber The phone number of the person you want to spam
   * @param message The message you want to spam
   * @param timesToSend The amount of times you want to send the message
   * @param countryCode The country code of the phone number, default is 591 (Bolivia)
   */
  constructor(
    public phoneNumber: string,
    public message: string,
    public timesToSend: string = '10',
    public countryCode: string = defaultCountryCode
  ) {}

  /**
   * Send the message to the phone number
   * @param client The client of the whatsapp-web.js library
   * @returns The amount of messages sent
   * @throws Error if the phone number is not valid
   */
  public async send(client: Client): Promise<number> {
    const sanitizedNumber = this.phoneNumber.toString().replace(/[- )(]/g, ''); // remove unnecessary chars from the number
    const finalNumber = `${this.countryCode}${sanitizedNumber.substring(
      sanitizedNumber.length - 10
    )}`;

    const numberDetails = await client.getNumberId(finalNumber); // get mobile number details

    if (numberDetails) {
      const messageInterval = setInterval(async () => {
        await client.sendMessage(numberDetails._serialized, this.message); // send message
      }, this.ONE_SECOND);

      setTimeout(() => {
        clearInterval(messageInterval);
      }, Number(this.timesToSend) * this.ONE_SECOND + this.PROCESSING_EXTRA_TIME);

      return Number(this.timesToSend);
    } else {
      throw new Error('Mobile number is not registered');
    }
  }
}
