const getSingleUser = async (id) => {
    try {
        const urlServer = `${urlAPIServer}${userModule}${singleUserEndpoint}${id}`
        const response = await fetch(urlServer);
    
        if(!response.ok) return {status: response.status};
        
        const data = await response.json();
    
        return {data, status: response.status};
    } catch (error) {
        console.log(error);

        return {status: 500}
    }
}