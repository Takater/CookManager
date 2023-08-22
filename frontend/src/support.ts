// Backend endpoints
const modulesEndpoint = 'http://localhost:8000/loadmodules'

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