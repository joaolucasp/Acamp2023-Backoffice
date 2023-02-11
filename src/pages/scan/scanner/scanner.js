let IDUser = 0;
let nextScreen;
const spinner = new Spinner();

const activeScannerScreen = function () {
    activeSection('scannerScreen');
    html5QrcodeScanner = new Html5QrcodeScanner(
        "scannerScreen",
        {
            "fps": 10,
            "qrbox": 250,
            "aspectRatio": 1,
        }
    );
    html5QrcodeScanner.render(onScanSuccess, onScanError);
}

async function onScanSuccess(qrCodeMessage) {
    IDUser = qrCodeMessage;
    html5QrcodeScanner.clear();
    await processScan(qrCodeMessage);
}

async function onCodeSuccess(qrCodeMessage) {
    IDUser = qrCodeMessage;
    await processScan(qrCodeMessage);
}

function onScanError(errorMessage) {
    //handle scan error
}

const processScan = async (qrCodeMessage) => {
    spinner.on();
    const routeActive = localStorage.getItem('route-scan');
    disableSection(routeActive);

    const response = await getSingleUser(qrCodeMessage);
    
    switch (response.status) {
        case 200:
            const user = response.data.data[0];
            manipulateSimplifyData(user);
            nextScreen = 'tableView';
            break;

        case 404:
            console.log('User not found');
            nextScreen = 'notFound';
            break;

        case 500:
            console.log('Internal server error');
            nextScreen = 'serverError';
            break;

        default:
            console.log('Error');
            break;
    }

    spinner.off();
    nextStep(nextScreen);
}

const manipulateSimplifyData = function (data) {
    document.getElementsByClassName('id-result-search')[0].innerText = data.ID;
    document.getElementsByClassName('name-result-search')[0].innerText = `${data.Nome} ${data.Sobrenome}`;
    document.getElementsByClassName('age-result-search')[0].innerText = getAge(data.DataNascimento);
    document.getElementsByClassName('telefone-result-search')[0].innerText = `(${data.DDD}) ${data.Telefone}`;
    document.getElementsByClassName('church-result-search')[0].innerText = data.Igreja;
    document.getElementsByClassName('email-result-search')[0].innerText = data.Email;
    document.getElementsByClassName('payment-result-search')[0].innerText = data.Pagamento;
}

const confirmCheckin = async () => {
    spinner.on();
    disableSection('tableView');
    const response = await registerCheckin(IDUser);

    switch (response.status) {
        case 201:
            nextScreen = 'checkinSuccess';
            break;

        case 500:
            nextScreen = 'serverError';
            console.log('Internal server error');
            break;

        default:
            console.log('Error');
            break;
    }

    spinner.off();
    nextStep(nextScreen);
}