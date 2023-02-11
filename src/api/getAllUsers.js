const urlUser2 = `http://localhost:3001/user/`
const endpoint = `getUsers/`

const getAllUsers = async (params) => {
    try {
        var urlServer = '';
        params ? urlServer = `${urlUser2}${endpoint}?${params}` : urlServer = `${urlUser2}${endpoint}`

        const response = await fetch(urlServer);
    
        if(!response.ok) return {status: response.status};
        
        const data = await response.json();
    
        return {data, status: response.status};
    } catch (error) {
        console.log(error);

        return {status: 500}
    }
}