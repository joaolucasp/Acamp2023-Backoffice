const urlUser = `http://localhost:3001/user/`
const endpoint = `getSingleUser/`

const getSingleUser = async (id) => {
    const urlServer = `${urlUser}${endpoint}${id}`
    const response = await fetch(urlServer);

    if(!response.ok) return {status: response.status};
    
    const data = await response.json();

    return {data, status: response.status};
}