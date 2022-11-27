import { prompt } from 'enquirer';
import { MainMenuAction, MainMenuResponse, PromptResponse } from '../types';

export const messageActions = async () => {
  return await prompt<PromptResponse>([
    {
      type: 'input',
      name: 'phoneNumber',
      message: 'Enter the phone number you want to spam',
      validate(value: string) {
        if (value.length >= 7 && Number(value)) {
          return true;
        }
        return 'Please enter a valid phone number';
      },
    },
    {
      type: 'input',
      name: 'message',
      message: 'Enter the message you want to spam',
      validate(value: string) {
        if (value.length >= 1) {
          return true;
        }
        return 'Please enter a valid message';
      },
    },
    {
      type: 'input',
      name: 'timesToSend',
      message: 'Enter the amount of times you want to send the message',
      required: false,
      validate(value: string) {
        if (value.length >= 1 && Number(value)) {
          return true;
        }
        return 'Please enter a valid number';
      },
    },
  ]);
};

export const mainMenuActions = async () => {
  return await prompt<MainMenuAction>([
    {
      type: 'select',
      name: 'action',
      message: 'What do you want to do?',
      choices: [
        { name: MainMenuResponse.SendMessage, message: 'Send message' },
        { name: MainMenuResponse.Logout, message: 'Logout' },
        { name: MainMenuResponse.Exit, message: 'Exit' },
      ],
    },
  ]);
};
