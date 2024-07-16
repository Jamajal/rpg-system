import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';
import { Dices, Home as HomeIcon, Layers, LogOut, UserRoundPenIcon, Users, Moon, SunMedium} from 'lucide-react'
import {useTheme} from '../hooks/useTheme'

export const Home = () => {
  const navigate = useNavigate();
  const { user, signout } = useContext(AuthContext) as any;
  const {theme, toggleTheme} = useTheme();

  const [contentDisplayed, setContentDisplayed] = useState({
    type: '',
    arr: [],
  });

  const handleSignout = () => {
    signout();
  };

  const handleShowCharacters = async () => {
    setContentDisplayed({
      type: 'characters',
      arr: user.characters,
    });
  };

  const handleShowMasteringTables = async () => {
    setContentDisplayed({
      type: 'master',
      arr: user.masterOfTables,
    });
  };

  const handleShowPlayingTables = async () => {
    setContentDisplayed({
      type: 'player',
      arr: user.playerOfTables,
    });
  };

  const renderContent = () => {
    if (contentDisplayed.type === 'characters') {
      return contentDisplayed?.arr?.map((element: any) => (
        <div key={element.id}>
          <h1>{element.name}</h1>
          <h2>{element.classes}</h2>
          <h2>{element.specie}</h2>
        </div>
      ));
    } else if (
      contentDisplayed.type === 'master' ||
      contentDisplayed.type === 'player'
    ) {
      return contentDisplayed?.arr?.map((element: any) => (
        <div key={element.id}>
          <h1>{element.name}</h1>
          <h1>{element.code}</h1>
        </div>
      ));
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-800 h-screen">
      <div className="flex flex-col h-screen p-2">
        <div className="flex flex-1">
          <aside className="flex flex-col w-72 bg-slate-950 p-6 space-y-6 rounded-lg">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white pl-1">
              <a href=''> <UserRoundPenIcon /> </a>
            </div>
            <p className="justify-self-start text-white">{user?.username ? `Olá ${user.username}!` : ''}</p>

            <nav className="flex flex-col flex-1 space-y-4 mt-10 pt-10 border-t border-gray-600">
              <Link to="/" className="flex items-center gap-3 text-white font-semibold hover:bg-white/10 rounded-lg"><HomeIcon /> Início</Link>
              <button onClick={handleShowCharacters} className="flex items-center gap-3 text-white font-semibold hover:bg-white/10 rounded-lg"><Users /> Personagens</button>
              <button onClick={handleShowMasteringTables} className="flex items-center gap-3 text-white font-semibold hover:bg-white/10 rounded-lg"><Layers /> Mesas mestrando</button>
              <button onClick={handleShowPlayingTables} className="flex items-center gap-3 text-white font-semibold hover:bg-white/10 rounded-lg"><Dices /> Mesas jogando</button>
              <button onClick={toggleTheme} className="flex items-center gap-3 text-white font-semibold hover:bg-white/10 rounded-lg">
                {theme === "light" ? (<SunMedium/>) : (<Moon />)}
                {theme === "light" ? 'Tema claro' : 'Tema escuro' }</button>
            </nav>

            <nav className="flex flex-col justify-content-end mt-10 pt-10 border-t border-gray-600 text-white">
              <button onClick={handleSignout} className="w-73 h-73 flex items-center justify-self-end gap-2 text-white text-sm hover:underline text-white "><LogOut /> Sair</button>
            </nav>

          </aside>
          <main className="flex-1 flex items-center">
            <div className="w-74 h-74 bg-gray-500">
              <p className="text-white p-6">Main</p>
              <div className="text-white">{renderContent()}</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
