import React, { useEffect, useState } from 'react';
import { ModulesList, User, normalizeName } from '../support';
import { redirect } from 'react-router-dom';

export default function Home () {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User["user"]>()

    const Modules = () => {

        let modulesList = [] as ModulesList["modules"]

        let rawModulesList = sessionStorage.getItem('cookmanager-modules-list')
        
        if (rawModulesList) {
            modulesList = JSON.parse(rawModulesList)
        }

        return ( 
            <div className="modules-list">
                <div className="row">
                    {modulesList.map((module, index) => {
                        
                        // Odd and not last item
                        const odd = ( (index % 2) > 0 ) && ( (modulesList.length - index) > 1)

                        // Normalize module name (remove special letters and characters)
                        const normalizedName = normalizeName(module.name)
                        
                        return (<>
                            <div className="col" key={normalizedName}>
                                <a href={"/" + normalizedName}>
                                    <span>{module.name}</span>
                                </a>

                            </div>
                            {odd && <div className="mb-5 w-100"></div>}
                        </>)
                    } 
                    )}
                </div>
            </div>
            )
    }

    // Load user data from session storage
    const loadUser = () => {
        const curr_user = sessionStorage.getItem('cookmanager-user-data')
        if (curr_user) {
            setUser(JSON.parse(curr_user))
        }
        else {
            redirect('/login')
        }
    }

    // Load user data on mount
    useEffect(() => {user ? setLoading(false) : loadUser()}, [user])

    return <>
        {loading ? <h1>Carregando...</h1> : 
            <h1>Bem-vindo, {user?.name}</h1>
        }
        {<Modules />}
    </>
}