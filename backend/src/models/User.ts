import { CharacterProps } from './Character';
import { TableProps } from './Table';
import { TableUserProps } from './TablePlayer';

export interface UserProps {
  username: string;
  password: string;
  email: string;
  masterOfTables?: { id: string }[];
  playerOfTables?: { id: string }[];
  characters?: { id: string }[];
}
