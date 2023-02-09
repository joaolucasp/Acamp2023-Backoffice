const endpoint = `http://localhost:3001/user/`
const module = `getSingleUser/`

const getSingleUser = async (id) => {
    const urlServer = `${endpoint}${module}${id}`
    const response = await fetch(urlServer);

    if(!response.ok) return {status: response.status};
    
    const data = await response.json();

    return {data, status: response.status};
}