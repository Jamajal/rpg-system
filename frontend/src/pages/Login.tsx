import { useContext, useState } from 'react';
import { createSession } from '../services/Api';
import { AuthContext } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { registerSession } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Email não informado.');
      return;
    }

    if (!password) {
      setError('Senha não informada.');
      return;
    }

    try {
      const response = await createSession(email, password);
      const isAuthenticated = await registerSession(response.data.object);

      //console.log(isAuthenticated);

      if (isAuthenticated.response) {
        navigate('/');
      } else {
        setError(isAuthenticated.message);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleLogin(e)}>
        <input
          type="email"
          name="email"
          placeholder="cellbo@gmail.com"
          id="email"
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
        />
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => {
            setPassword(e.target.value);
            setError('');
          }}
        />
        <button type="submit">Logar</button>
        {error && <p>{error}</p>}
      </form>
      {/* <div className="w-60 h-60 flex justify-center items-center gap-3 text-xl font-bold bg-purple-200">
        <p className="text-red-500">linha1</p>
        <p className="text-yellow-500">lin2</p>
        <p className="text-green-500">linha3</p>
      </div> 
      <button
        className="
          py-2 
          px-4 
          font-bold 
          text-lg 
          rounded-sm 
          text-white 
          bg-black 
          hover:bg-gray-800"
      >
        Enviar
      </button> */}
    </div>
  );
};
