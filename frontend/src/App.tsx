import React, { useEffect, useState } from 'react';
import './App.css';
import { ModulesList, User, UserError, loadModulesList, logUser } from './support';
import { useNavigate } from 'react-router-dom';

function App() {

  const [loading, setLoading] = useState(true);
  const [lista, setLista] = useState<ModulesList>()

  const navigate = useNavigate()

  useEffect(() => {

    // If lista
    if(lista) {

      const user_token = localStorage.getItem('cookmanager-user-token')

      // Check for e-commerce module
      if (lista.modules.filter(module => module.name === 'E-Commerce').length > 0) {

        // Log user via token
        if (user_token) {
          const user_log = logUser(undefined, undefined, user_token) as unknown as (User | UserError)

          // Successful login via token
          if (user_log.code === 200) {
            const user = (user_log as User).user
            if (user.staff) {
              // Home
            } 
            else {
              // Logged e-commerce window
            }
          } 
          else {
            // Log via token Error
          }
        }
        
        // Not logged
        else {
          // Unlogged e-commerce window
        }
      }

      // No e-commerce module
      else {

        // Log user via token
        if(user_token) {
          const user_log = logUser(undefined, undefined, user_token) as unknown as (User | UserError)

          if (user_log.code === 200) {
            const user = (user_log as User).user
            // Home
          }
          else {
            // Log via token error
          }
        }
        else {
          navigate('login')
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
        {loading ? <>Carregando...</> : 
          <>
            {lista?.modules.map(mod => <p key={"modulo"+mod.id}>{mod.name}</p>)}
          </>
        }
      </header>
    </div>
  );
}

export default App;
