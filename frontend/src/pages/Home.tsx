import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { Link } from "react-router-dom";

export const Home = () => {
  const { user } = useContext(AuthContext) as any;

  console.log(user, 'usuario')

  return (
    <div className="h-73 content-center">
      <h1 className="font-bold text-3xl text-center items-start text-black dark:text-white">Roll20 Do Paraguai</h1>
      <div className="grid grid-cols-3 gap-4 p-6">
        <div className="flex flex-col bg-white dark:bg-gray-400 w-96 h-96 rounded-lg p-6 text-black dark:text-white gap-6">
          <h1 className="font-bold text-lg text-center">Seus Personagens</h1>
          <Link to="/characters" className="flex flex-col font-semibold text-md text-center hover:underline hover:bg-black/10 p-1">{user.character ? `${user.character}` : 'Você ainda não possui nenhum personagem'}</Link>
        </div>
        <div className="flex flex-col bg-white dark:bg-gray-400 w-96 h-96 rounded-lg p-6 text-black dark:text-white gap-6">
          <h1 className="font-bold text-lg text-center">Campanhas Mestradas</h1>
          {Array.isArray(user.masterOfTables) && user.masterOfTables.length > 0 ? (
            user.masterOfTables.map(table => (
              <Link to="/" className="flex flex-col text-center font-semibold text-md hover:underline hover:bg-black/10 p-1">
                <p>{`Campanha: ${table.name}.`}</p>
                <p>{`Código: ${table.code}`}</p>
              </Link>
            ))
          ) : (<Link to="/mastertables" className="flex flex-col font-semibold text-md text-center hover:underline hover:bg-black/10 p-1">Você ainda não mestrou nenhuma campanha</Link>)}
        </div>
        <div className="flex flex-col bg-white dark:bg-gray-400 w-96 h-96 rounded-lg p-6 text-black dark:text-white gap-6">
          <h1 className="font-bold text-lg text-center">Mesas Jogadas</h1>
          {Array.isArray(user.playerOfTables) && user.playerOfTables.length > 0 ? (
            user.playerOfTables.map(table => (
              <Link to="/" className="flex flex-col text-center font-semibold text-md hover:underline hover:bg-black/10 p-1">
                <p>{`Campanha: ${table.name}.`}</p>
                <p>{`Código: ${table.code}`}</p>
              </Link>
            ))
          ) : (<Link to="/playingtables" className="flex flex-col font-semibold text-center text-md hover:underline hover:bg-black/10 p-1">Você ainda não jogou nenhuma campanha</Link>)}
        </div>
      </div>
    </div>
  );
};
