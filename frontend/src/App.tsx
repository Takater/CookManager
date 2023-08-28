import React, { useEffect, useState } from 'react';
import './App.css';
import { ModulesList, User, UserError, loadModulesList, logUser } from './support';
import { useNavigate } from 'react-router-dom';

function App() {

  const [loading, setLoading] = useState(true);
  const [lista, setLista] = useState<ModulesList>()
  const [userData, setUserData] = useState<User | UserError>()

  const navigate = useNavigate()

  const loadUser = () => {
    const user_token = localStorage.getItem('cookmanager-user-token')

    // Log user via token
    if (user_token) {
      logUser(undefined, undefined, user_token, undefined, setUserData)
    }
  }
  useEffect(() => {

    loadUser()

    // If lista
    if(lista) {

      // Set list of modules to session storage
      sessionStorage.setItem('lista-modulos-cookmanager', JSON.stringify(lista.modules))

      /* 
        Check for e-commerce module
        If staff, take to home. If client, take to shop.
      */
      if (lista.modules.filter(module => module.name === 'E-Commerce').length > 0) {
        if (userData?.code === 200) {
          
          // Set user data to session storage
          sessionStorage.setItem('cookmanager-user-data', JSON.stringify((userData as User).user))

          if ((userData as User).user.staff) {
            navigate('/home')
          } else {
            navigate('/shop')
          }
        }

      /*
        No e-commerce module means no client user
        Take to home or back to login
      */
      } else {
        if (userData?.code === 200) {

          // Set user data to session storage
          sessionStorage.setItem('cookmanager-user-data', JSON.stringify((userData as User).user))
          navigate('/home')
        } else {
          navigate('/login')
        }
      }
      setLoading(false);
    } else if (loading) {
      loadModulesList(setLista)
    }

  }, [loading, lista])

  return (
    <div className="App">
      <header className="App-header">
        {loading && <>Carregando...</>}
      </header>
    </div>
  );
}

export default App;
