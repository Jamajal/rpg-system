import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

export const PlayingTables = () => {
    const { user } = useContext(AuthContext) as any;

    return (
        <>
            <p>Mesas Jogando</p>
            <button>Entrar em uma campanha</button>
        </>
    )
}