// Backend endpoints
const modulesEndpoint = 'http://localhost:8000/stock'

export async function loadModulesList (setList: Function) {

    const res = await fetch(modulesEndpoint)
    const data = await res.json()
    setList(data)
    return data

}