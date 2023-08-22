import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ModulesList, loadModulesList } from './support';

function App() {

  const [loading, setLoading] = useState(true);
  const [lista, setLista] = useState<unknown>()

  useEffect(() => {
    if(lista) {
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
            {(lista as ModulesList).modules.map(((module, index) => 
              {
                return <p key={module.name}>{module.name}</p>
              }
            ))}
          </>
        }
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
