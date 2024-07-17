import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Home } from '../pages/Home';
import { AuthContext, AuthProvider } from '../contexts/authContext';
import { useContext } from 'react';
import { SingIn } from '../pages/SingIn';
import { Characters } from '../pages/Characters';
import { MenuComponent } from '../components/MenuComponent';
import { MasterTables } from '../pages/MasterTables';
import { PlayingTables } from '../pages/PlayingTables';

const Root = () => {
  return (
    <Private>
      <div className="flex items-center justify-center bg-body dark:bg-zinc-800 h-screen">
        <div className="flex flex-col h-screen p-2">
          <div className="flex flex-1 gap-0.5">
            <MenuComponent />
            <main className="flex-1 flex items-center">
              <div className="flex-1 w-73 h-73 bg-main dark:bg-gray-500 rounded-lg">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>    
    </Private>
  )
}

const Private = ({ children }: any) => {
  const { authenticated, loading } = useContext(AuthContext) as any;

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
    path: '/',
    element: <Root />,
    children: [{
      path: '',
      element: <Home />
    },
    {
      path: 'characters',
      element: <Characters />
    },
    {
      path: 'mastertables',
      element: <MasterTables />
    },
    {
      path: 'playintables',
      element: <PlayingTables />
    },
    ]
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/singIn',
    element: <SingIn />,
  }
]);

export const AppRoutes = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
