import React, { useEffect, useState } from "react"
import "../css/login.css"
import { User, UserError, logUser } from "../support"
import { useNavigate } from "react-router-dom"

export default function Login () {

    const navigate = useNavigate()

    const [logged, setLogged] = useState<User | UserError>()

    useEffect(() => {

        const handleLogin = () => {
            const username = document.getElementById("username") as HTMLInputElement;
            const password = document.getElementById("password") as HTMLInputElement;
            const keeplogged = document.getElementById("keeplogged") as HTMLInputElement;

            const user = logUser(username.value, password.value, undefined, keeplogged.checked) as unknown as (User | UserError)

            setLogged(user)
        }

        if(logged) {
            logged.code === 200 ? navigate('home') : document.getElementById("loginsubmit")?.addEventListener('click', handleLogin);
        }
        document.getElementById("loginsubmit")?.addEventListener('click', handleLogin);

    }, [logged])
    return (
        <>
            <form id="loginform">
                <img alt="company-logo" className="mb-5"/>
                <div className="mb-2">
                    <input type="email" id="username" name="username" className="form-control" required />
                    {logged?.code === 404 && <p className="login-error">{(logged as UserError).message}</p>}
                    <label htmlFor="username" className="form-label">E-mail</label>
                </div>
                <div>
                    <input type="password" id="password" name="password" className="form-control" required />
                    {logged?.code === 400 && <p className="login-error">{(logged as UserError).message}</p>}
                    <label htmlFor="password" className="form-label">Senha</label>
                </div>
                <div className="form-check keeplogged-formcheck mt-3">
                    <input type="checkbox" id="keeplogged" className="form-check-input" />
                    <label htmlFor="keeplogged" className="form-check-label">Manter conectado</label>
                </div>
                <button id="loginsubmit" type="button" className="btn btn-success mt-5">Entrar</button>
            </form>
        </>
    )
}