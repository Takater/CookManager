import React, { useEffect, useState } from 'react';
import { ModulesList, User } from '../support';
import { redirect } from 'react-router-dom';

export default function Home () {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User["user"]>()

    const loadModules = () => {

        let modulesList = [] as ModulesList["modules"]

        let rawModulesList = sessionStorage.getItem('cookmanager-modules-list')
        
        if (rawModulesList) {
            modulesList = JSON.parse(rawModulesList)
        }

        return modulesList.map(module => {
            return <p key={"Módulo " + module.id.toString()}>{module.name}</p>
        })
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
        {loadModules()}
    </>
}