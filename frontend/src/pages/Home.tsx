import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';

export const Home = () => {
  const navigate = useNavigate();
  const { user, signout } = useContext(AuthContext) as any;

  const [contentDisplayed, setContentDisplayed] = useState({
    type: '',
    arr: [],
  });

  const handleSignout = () => {
    signout();
    //navigate('/login');
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
      return contentDisplayed.arr.map((element: any) => (
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
      return contentDisplayed.arr.map((element: any) => (
        <div key={element.id}>
          <h1>{element.name}</h1>
          <h1>{element.code}</h1>
        </div>
      ));
    }
  };

  return (
    <div>
      <button onClick={handleSignout}>Sair</button>
      <p>{user?.username ? `Olá ${user.username}!` : ''}</p>
      <button onClick={handleShowCharacters}>Personagens</button>
      <button onClick={handleShowMasteringTables}>Mesas mestrando</button>
      <button onClick={handleShowPlayingTables}>Mesas jogando</button>
      <div>{renderContent()}</div>
    </div>
  );
};
