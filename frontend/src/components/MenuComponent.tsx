import { Dices, Home as HomeIcon, Layers, LogOut, UserRoundPenIcon, Users, Moon, SunMedium } from 'lucide-react'
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme';
import { AuthContext } from '../contexts/authContext';

export const MenuComponent = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, signout } = useContext(AuthContext) as any;

  const handleSignout = () => {
    signout();
  };

  return (
    <aside className="flex flex-col w-72 bg-aside dark:bg-slate-950 p-6 space-y-6 rounded-lg border-solid border-2 border-gray-600 dark:border-white-900">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-300 text-white dark:bg-white dark:text-black pl-1">
        <a href=''> <UserRoundPenIcon /> </a>
      </div>
      <p className="justify-self-start text-black dark:text-white">{user?.username ? `Olá ${user.username}!` : ''}</p>

      <nav className="flex flex-col flex-1 space-y-4 mt-10 pt-10 border-t border-gray-600">
        <ul className="flex flex-col gap-2">
          <li className="flex gap-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg p-1 text-black dark:text-white font-semibold">
            <HomeIcon />
            <Link to="/">Início</Link>
          </li>
          <li className="flex gap-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg p-1 text-black dark:text-white font-semibold">
            <Users />
            <Link to="/characters">Personagens</Link>
          </li>
          <li className="flex gap-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg p-1 text-black dark:text-white font-semibold">
            <Layers />
            <Link to="/mastertables">Mesas mestrando</Link>
          </li>
          <li className="flex gap-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg p-1 text-black dark:text-white font-semibold">
            <Dices />
            <Link to="/playingtables">Mesas jogando</Link>
          </li>
        </ul>
        <button onClick={toggleTheme} className="flex items-center gap-3 text-black dark:text-white font-semibold hover:bg-black/10 dark:hover:bg-white/10 rounded-lg">
          {theme === "light" ? (<SunMedium />) : (<Moon />)}
          {theme === "light" ? 'Tema claro' : 'Tema escuro'}</button>
      </nav>

      <nav className="flex flex-col justify-content-end mt-10 pt-10 border-t border-gray-600 text-white">
        <button onClick={handleSignout} className="flex items-center justify-self-end gap-2 text-sm hover:underline text-black dark:text-white"><LogOut /> Sair</button>
      </nav>
    </aside>
  )
}