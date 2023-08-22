import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { loadModulesList } from './support';

interface APIRes{
  code: number;
  method: string;
  message: string;
}
function App() {

  const [loading, setLoading] = useState(true);
  const [lista, setLista] = useState<unknown>()

  useEffect(() => {
    if(lista) {
      console.log(lista)
      setLoading(false);
    } else {
      loadModulesList(setLista)
    }

  }, [loading, lista])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {loading ? <>Edit <code>src/App.tsx</code> and save to reload.</> : <>{(lista as APIRes).message}</>}
        </p>
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
