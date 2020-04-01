
export interface MessageLog {
  type?: TypeMessage;
  content: string;
}

export enum TypeMessage {
  IMPORTANT, // Message en rouge
  INFO, // Message normaux
  MY_PKMN,
  ENEMY_PKMN
}