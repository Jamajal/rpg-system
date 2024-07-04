export interface CharacterProps {
  name: string;
  classes: string;
  genre: string;
  specie: string;
  background?: string;
  created_at?: Date;
  updated_at?: Date;
  userId: string;
  tableId: string | null;
  systemId: string;
  //sheet?: any;
}
