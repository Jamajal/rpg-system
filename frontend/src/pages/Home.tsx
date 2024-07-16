import { MenuComponent, renderContent } from '../components/MenuComponent';

export const Home = () => {
  return (
    <div className="flex items-center justify-center bg-body dark:bg-zinc-800 h-screen">
      <div className="flex flex-col h-screen p-2">
        <div className="flex flex-1 gap-0.5">
          <MenuComponent />
          <main className="flex-1 flex items-center">
            <div className="content-center w-73 h-73 bg-main dark:bg-gray-500 rounded-lg">
              <h1 className="font-bold text-3xl text-center items-start text-black dark:text-white">Roll20 Do Paraguai</h1>
              <div className="grid grid-cols-3 gap-4 p-6">
                <div className="bg-white w-96 h-96 rounded-lg p-6">
                  Personagens
                  <button className="bg-green-200 ">Criar Personagem</button>
                </div>
                <div className="bg-white w-96 h-96 rounded-lg p-6">
                  <div className="text-black dark:text-white">{renderContent()}</div>
                  <button>Criar Campanha</button>
                </div>
                <div className="bg-white w-96 h-96 rounded-lg p-6">
                  Mesas jogadas
                  <button>Entrar em uma campanha</button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
