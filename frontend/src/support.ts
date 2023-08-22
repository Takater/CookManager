// Backend endpoints
const modulesEndpoint = 'http://localhost:8000/loadmodules'
const loginEndpoint = 'http://localhost:8000/login'

// Modules
interface Module {
    id: number;
    name: string;
}

export interface ModulesList {
    'modules': Array<Module>
}

export async function loadModulesList (setList: Function) {
    const res = await fetch(modulesEndpoint)
    const data = await res.json()
    setList(data)
    return data
}

// User
interface User {
    name: string;
    phone: string;
    perms: Array<string>;
    staff: boolean;
    token: string;
}

interface UserError {
    code: number;
    message: string;
}

export async function logUser(username: string | undefined, password: string | undefined, token: string | undefined) {
    const res = await fetch(loginEndpoint, {
        "method": "POST",
        "headers": {
            "username": username ? username : '',
            "password": password ? password : '',
            "token": token ? token : ''
        },
    })
    const user = await res.json()
    return user as User | UserError
}