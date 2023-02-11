const urlRegister = `http://192.168.1.104:3001/register/`
const module = `checkin/`

const registerCheckin = async (id) => {
    const urlServer = `${urlRegister}${module}${id}`

    const response = await fetch(urlServer, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "values": [
                [getDate()]
            ]
        })
    });

    if(!response.ok) return {status: response.status};
    
    const data = await response.json();
    
    return {data, status: response.status};
}

const getDate = () => {
    let date = new Date();
    return stringDate = (date.getHours() + ":" + date.getMinutes() + " & " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
}