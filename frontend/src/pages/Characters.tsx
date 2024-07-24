import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

export const Characters = () => {
  const { user } = useContext(AuthContext) as any;

  return (
    <>
      <p>Personagens</p>
      <button className="bg-green-200 ">Criar Personagem</button>
    </>
  )
}

