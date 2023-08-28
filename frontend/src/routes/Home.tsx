import React, { useEffect, useState } from 'react';
import { User } from '../support';
import { redirect } from 'react-router-dom';

export default function Home () {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User["user"]>()

    const loadUser = () => {
        const curr_user = sessionStorage.getItem('cookmanager-user-data')
        if (curr_user) {
            setUser(JSON.parse(curr_user))
        }
        else {
            redirect('/login')
        }
    }

    useEffect(() => {

        user ? setLoading(false) : loadUser()

    }, [user])

    return <>
        {loading ? <h1>Carregando...</h1> :
        <h1>Bem-vindo, {user?.name}</h1>}
    </>
}