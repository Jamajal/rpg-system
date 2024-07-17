import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

export const MasterTables = () => {
    const { user } = useContext(AuthContext) as any;

    return(
        <>
        <p>Mesas mestradas</p>
        </>
    )
}