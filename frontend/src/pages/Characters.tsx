import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

export const Characters = () => {
  const { user } = useContext(AuthContext) as any;
  
  return (
    <>
      <p>Personagens</p>
    </>
  )
}

