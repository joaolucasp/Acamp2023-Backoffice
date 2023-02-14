const urlPaymentModule = `http://192.168.1.196:3001/payment/`
const endpointPayment = `getPayments/`

const getUsersByChurch = async (params) => {
    try {
        var urlServer = '';
        params ? urlServer = `${urlPaymentModule}${endpointPayment}${params}` : urlServer = `${urlPaymentModule}${endpointPayment}`;

        const response = await fetch(urlServer);
    
        if(!response.ok) return {status: response.status};
        
        const data = await response.json();
    
        return {data, status: response.status};
    } catch (error) {
        console.log(error);

        return {status: 500}
    }
}