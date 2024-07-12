import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/authContext';
import { InputComponent } from "../components/InputComponent";
import { createUser } from '../services/Api';
import { useNavigate } from 'react-router-dom';



export const SingIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassowrd, setConfirmPassowrd] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const { registerSession } = useContext(AuthContext) as any;
  const navigate = useNavigate();

  const handleSingIn = async (e: any) => {
    e.preventDefault();
    
    if(confirmPassowrd !== password){
      setError('As senhas são diferentes');
      return
    }

    try {
      const response = await createUser(username, email, password);
      const isAuthenticated = await registerSession(response.data.object);

      if (isAuthenticated.response) {
        navigate('/');
      } else {
        setError(isAuthenticated.message);
      }

    } catch (error: any) {
      setError(error.response.data.message);
    }
  }

  function ReturnToLogin(): any {
    navigate('/login');
  }

  function HandlerUsername(e: any): void {
    setUsername(e.target.value);
    setError('');
  }

  function HandlerEmail(e: any): void {
    setEmail(e.target.value);
    setError('');
  }

  function HandlerPassword(e: any): void {
    setPassword(e.target.value);
    setError('');
  }

  function HandlerConfirmPassword(e: any): void {
    setConfirmPassowrd(e.target.value);
    setError('');
  }

  return (
    <div className="bg-[url('../assets/dados.jpeg')] h-screen w-screen bg-no-repeat bg-cover bg-scroll bg-center">
      <div className="flex flex-col h-screen justify-center items-center gap-2">
        <div className="flex items-center">
          <div className="flex flex-col gap-2 bg-white shadow-md rounded-md p-6 h-auto w-96">
            <h2 className="text-3xl font-bold text-center">Crie sua conta</h2>
            <form onSubmit={handleSingIn}>
              <InputComponent inputId='userName' inputName='Nome de usuário' onChange={HandlerUsername} placeholder='Digite seu nome' type='text' />
              <InputComponent inputId='email' inputName='Email' onChange={HandlerEmail} placeholder='Digite seu Email' type='email' />
              <InputComponent inputId='password' inputName='Senha' onChange={HandlerPassword} placeholder='Digite sua Senha' type='password' />
              <InputComponent inputId='password' inputName='Confirme sua Senha' onChange={HandlerConfirmPassword} placeholder='Digite sua Senha' type='password' />
              <button type="submit" className="mt-2 w-full text-sm bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white shadow">Criar conta</button>
              <button type="button" className="mt-2 mb-2 w-full text-sm bg-gray-500 hover:bg-blue-500 px-6 py-2 rounded text-white shadow" onClick={ReturnToLogin}>Voltar</button>
              {error && <p className="text-red-500">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}