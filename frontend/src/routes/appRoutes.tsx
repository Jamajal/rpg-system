import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Home } from '../pages/Home';
import { AuthContext, AuthProvider } from '../contexts/authContext';
import { useContext } from 'react';

const Private = ({ children }) => {
  const { authenticated, loading } = useContext(AuthContext);

  if (loading) return <div className="loading">Carregando...</div>;

  if (!authenticated) {
    return (
      <>
        <Login />
      </>
    );
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <Private>
        <Home />
      </Private>
    ),
  },
]);

export const AppRoutes = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
