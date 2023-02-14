const urlAPIServer = `http://192.168.1.196:3001/`
const userModule = `user/`
const registerModule = `register/`
const paymentModule = `payment/`
const allUsersEndpoint = `getUsers/`
const singleUserEndpoint = `getSingleUser/`
const registerCheckinEndpoint = `checkin/`
const registerCheckoutEndpoint = `checkin/`
const getPaymentsEndpoint = `getPayments/`

const getAge = function (date) {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

const getDate = () => {
    let date = new Date();
    return stringDate = ((date.getHours() < 9 ? `0${date.getHours()}` : date.getHours()) + ":" + (date.getMinutes() < 9 ? `0${date.getMinutes()}` : date.getMinutes()) + " & " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
}

const setCssExtendContent = function () {
    const css = document.getElementById('cssContent');

    css.setAttribute('href', '../../stylesheet/extend-content.css');
}

const setCssDefaultContent = function () {
    const css = document.getElementById('cssContent');

    css.setAttribute('href', '../../stylesheet/default-content.css');
}

const copyToClipboard = async () => {
    const response = await getAllUsers('checkin=true');
    let content = '';

    for (let i = 0; i < response.data.data.length; i++) {
        const user = response.data.data[i];
        content += `${user.Nome} ${user.Sobrenome}` + '\n';
    }

    navigator.clipboard.writeText(content);
}