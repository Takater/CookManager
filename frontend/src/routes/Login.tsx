import React, { useEffect, useState } from "react"
import "../css/login.css"
import { User, UserError, logUser } from "../support"
import { Navigate, redirect } from "react-router-dom"

export default function Login () {

    const [logged, setLogged] = useState<User | UserError>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        
        const handleLogin = () => {
            setLoading(true)
            const username = document.getElementById("username") as HTMLInputElement;
            const password = document.getElementById("password") as HTMLInputElement;
            const keeplogged = document.getElementById("keeplogged") as HTMLInputElement;

            logUser(username.value, password.value, undefined, keeplogged.checked, setLogged)
        }
        
        if(logged) {
            setLoading(false)
            if (logged.code === 200) {
                const logged_user = (logged as User).user
                logged_user.token ? localStorage.setItem("cookmanager-user-token", logged_user.token) : sessionStorage.setItem("cookmanager-user-data", JSON.stringify(logged_user))
                console.log(logged_user)
                redirect("/")
            } else {
                document.getElementById("loginsubmit")?.addEventListener('click', handleLogin);
            }
        }
        document.getElementById("loginsubmit")?.addEventListener('click', handleLogin);

    }, [logged])
    return (
        <>
            <form id="loginform">
                <img alt="company-logo" className="mb-5"/>
                {logged?.code === 500 && <p className="login-error">{(logged as UserError).message}</p>}

                <div className="mb-2">
                    <input type="email" id="username" name="username" className="form-control" required disabled={loading}/>
                    {logged?.code === 404 && <p className="login-error">{(logged as UserError).message}</p>}
                    <label htmlFor="username" className="form-label">E-mail</label>
                </div>

                <div>
                    <input type="password" id="password" name="password" className="form-control" required disabled={loading}/>
                    {logged?.code === 400 && <p className="login-error">{(logged as UserError).message}</p>}
                    <label htmlFor="password" className="form-label">Senha</label>
                </div>

                <div className="form-check keeplogged-formcheck mt-3">
                    <input type="checkbox" id="keeplogged" className="form-check-input" />
                    <label htmlFor="keeplogged" className="form-check-label">Manter conectado</label>
                </div>
                
                {logged?.code === 200 && <Navigate to="/" replace={true} />}
                <button id="loginsubmit" type="button" className="btn btn-success mt-5">Entrar</button>
            </form>
        </>
    )
}