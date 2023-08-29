import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/Login";
import Home from "./routes/Home";
import { ModulesList, normalizeName } from "./support";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Dynamically generate hired modules routes
const modulesLinks = async () => {
  
  // Load hired modules list
  let modulesList = [] as ModulesList["modules"]
  let rawModulesList = sessionStorage.getItem('cookmanager-modules-list')
  
  if (rawModulesList) {
    modulesList = JSON.parse(rawModulesList)
    
    // Dynamically generate paths and components
    const moduleRoutes = await Promise.all(modulesList.map(async (module) => {
      const modName = module.name
      const normPath = normalizeName(modName)
      const ModuleComponent = await import(`./routes/modules/${modName}`) // Dynamically import component

      // Route path and component
      return {
        path: normPath,
        element: <ModuleComponent.default />
      }
    }))

    // Return list
    return moduleRoutes;
  
  // Load error
  } else {
    return [{
      path: "/module",
      element: <><h1>Error</h1></>
    }]
  }

}

// Asynchronously load routes
(async () => {

  // Load paths
  const modulePaths = await modulesLinks()

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />
    },
    {
      path: "login",
      element: <Login />
    },
    {
      path: "home",
      element: <Home />
    },
    // Modules routes
    ...modulePaths
  ])
  
  root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
  );

// Run async function
})()


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
