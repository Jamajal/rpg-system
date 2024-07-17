export const Home = () => {
  return (
    <div className="h-73 content-center">
      <h1 className="font-bold text-3xl text-center items-start text-black dark:text-white">Roll20 Do Paraguai</h1>
      <div className="grid grid-cols-3 gap-4 p-6">
        <div className="bg-white w-96 h-96 rounded-lg p-6">
          Personagens
          <button className="bg-green-200 ">Criar Personagem</button>
        </div>
        <div className="bg-white w-96 h-96 rounded-lg p-6">
          <button>Criar Campanha</button>
        </div>
        <div className="bg-white w-96 h-96 rounded-lg p-6">
          Mesas jogadas
          <button>Entrar em uma campanha</button>
        </div>
      </div>
    </div>
  );
};
