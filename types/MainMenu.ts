export interface MainMenuAction {
  action: MainMenuResponse;
}

export enum MainMenuResponse {
  SendMessage = 'send-message',
  Logout = 'logout',
  Exit = 'exit',
}
