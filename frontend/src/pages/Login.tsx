import { useContext, useState } from 'react';
import { createSession } from '../services/Api';
import { AuthContext } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { InputComponent } from '../components/InputComponent'

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { registerSession } = useContext(AuthContext) as any;
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
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

  function HandlerEmail(e: any): void {
    setEmail(e.target.value);
    setError('');
  }

  function HandlerPassword(e: any): void {
    setPassword(e.target.value);
    setError('');
  }

  function SingIn(): void {
    navigate('/singIn');
  }

  return (
    <div className="bg-[url('../assets/dados.jpeg')] h-screen w-screen bg-no-repeat bg-cover bg-scroll bg-center">
      <div className="flex flex-col h-screen justify-center items-center gap-2">
        <div className="flex items-center">
          <div className="flex flex-col gap-2 bg-white shadow-md rounded-md p-6 h-96 w-96">
            <h2 className="text-3xl font-bold text-center">Login</h2>
            <form onSubmit={(e) => handleLogin(e)}>
              <InputComponent inputId='email' inputName='Email' onChange={HandlerEmail} placeholder='Digite seu Email' type='email' />
              <InputComponent inputId='password' inputName='Senha' onChange={HandlerPassword} placeholder='Digite sua Senha' type='password' />
              <div className="text-right">
                <a className="text-sm text-gray-500 hover:underline">Esqueceu sua senha?</a>
              </div>
              <button type="submit" className="mt-2 w-full text-sm bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white shadow">Entrar</button>
              <button type="button" className="mt-2 mb-2 w-full text-sm bg-gray-500 hover:bg-blue-500 px-6 py-2 rounded text-white shadow" onClick={SingIn}>Criar conta</button>
              {error && <p className="text-red-500">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
