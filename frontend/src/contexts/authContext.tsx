import { createContext, useState, useEffect } from 'react';
import { api, getUserById, validateToken } from '../services/Api';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    stillConected();
  }, []);

  const registerSession = async (loginInfo) => {
    const token = loginInfo.token;

    try {
      const response = await getUserInfo(loginInfo.id, token);

      if (response.status === 200) {
        setUser(response.data.object);
        localStorage.setItem('token', token);
        setAuthenticated(true);
        api.defaults.headers.Authorization = `Bearer ${token}`;

        return {
          response: true,
          message: 'Login efetuado com sucesso.',
        };
      }

      return {
        response: false,
        message: response.data.message,
      };
    } catch (error) {
      return {
        response: false,
        message: error.message,
      };
    }
  };

  const signout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
    setLoading(false);
  };

  const stillConected = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return false;
    }

    const response = await validateToken(token);

    if (response.status === 200) {
      setUser(response.data.object);
      setAuthenticated(true);
      setLoading(false);
      return true;
    }

    signout();

    return false;
  };

  const getUserInfo = async (id: string, token: string) => {
    return await getUserById(id, token);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated,
        loading,
        registerSession,
        signout,
        stillConected,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
