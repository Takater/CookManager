import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ModulesList, loadModulesList, logUser } from './support';

function App() {

  const [loading, setLoading] = useState(true);
  const [lista, setLista] = useState<ModulesList>()

  useEffect(() => {

    // Set loading if lista, set lista if loading
    if(lista) {
      if (lista.modules.filter(module => module.name == 'E-Commerce').length > 0) {
        const user_token = localStorage.getItem('cookmanager-user-token')
        if (user_token) {
          const user = logUser(undefined, undefined, user_token)
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
        <img src={logo} className="App-logo" alt="logo" />
        {loading ? <>Carregando...</> : 
          <>
            {lista?.modules.map((module => 
              {
                return <p key={'módulo' + module.name}>{module.name}</p>
              }
            ))}
          </>
        }
      </header>
    </div>
  );
}

export default App;
