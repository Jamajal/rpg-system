import { CharacterProps } from './Character';
import { TableUserProps } from './TablePlayer';

export interface TableProps {
  name: string;
  password: string;
  status: boolean;
  masterId: string;
  created_at?: Date;
  updated_at?: Date;
  playerId?: string;
  characters?: CharacterProps[];
}
