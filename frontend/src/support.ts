// Backend endpoints
const baseUrl = "http://localhost:8000/"
const modulesEndpoint = baseUrl + "loadmodules"
const loginEndpoint = baseUrl + "login"

// Modules
interface Module {
    id: number;
    name: string;
}

export interface ModulesList {
    "modules": Array<Module>
}

export async function loadModulesList (setList: Function) {
    const res = await fetch(modulesEndpoint)
    const data = await res.json()
    setList(data)
    return data
}

// User
export interface User {
    code: number;
    user: {
        name: string;
        phone: string;
        perms: Array<string>;
        staff: boolean;
        token: string;
    }
}

export interface UserError {
    code: number;
    message: string;
}

export async function logUser(username?: string, password?: string, token?: string, keeplogged?: boolean) {

    const api_headers = {"username": "", "password": "", "cookmanager-user-token": "", "keep-logged": keeplogged ? "1" : ""}

    if (username) {
        api_headers["username"] = username
        
        // Return error if no password
        if (!password) {
            return {
                "code": 400,
                "message": "Senha inválida"
            } as UserError;
        }

        api_headers["password"] = password

    } else if (token) {
        api_headers["cookmanager-user-token"] = token
    
    // Return error if no data
    } else {
        return {
            "code": 500,
            "message": "Requisição inválida"
        } as UserError;
    }

    console.log(api_headers)
    const res = await fetch(loginEndpoint, {
        mode: "cors",
        method: "POST",
        headers: api_headers
    })

    const user = await res.json()
    return user as User | UserError
}