// Backend endpoints
const baseUrl = "http://localhost:8000/"
const modulesEndpoint = baseUrl + "loadmodules"
const loginEndpoint = baseUrl + "login"

// Modules intefaces and functions
interface Module {
    id: number;
    name: string;
}

export interface ModulesList {
    "modules": Array<Module>
}

// Load hired modules list and set to hook
export async function loadModulesList (setList: Function) {
    const res = await fetch(modulesEndpoint)
    const data = await res.json()
    setList(data)
    return data
}

// User interfaces and functions
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

// Try to log user according to data
export async function logUser(username?: string, password?: string, token?: string, keeplogged?: boolean, setUser?: Function) {

    const api_headers = {
        "username": "", 
        "password": "", 
        "cookmanager-user-token": "", 
        "keep-logged": keeplogged ? "1" : ""
    }

    // Login with username and password
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
    
    // Login with token
    } else if (token) {
        api_headers["cookmanager-user-token"] = token
    
    // Return error if no data
    } else {
        return {
            "code": 500,
            "message": "Requisição inválida"
        } as UserError;
    }

    // API call
    const res = await fetch(loginEndpoint, {
        method: "GET",
        headers: api_headers
    })
    const user = await res.json()
    
    if (keeplogged && user.code === 200) {
        localStorage.setItem("cookmanager-user-token", user.user.token)
    }

    // Set or return user data   
    setUser && setUser(user)
    return user as User | UserError
}

export function normalizeName(name: string) {
    return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
}