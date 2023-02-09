let IDUser = 0;

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
    await processScan(qrCodeMessage);
    nextStep();
    html5QrcodeScanner.clear();
}

async function onCodeSuccess(qrCodeMessage) {
    IDUser = qrCodeMessage;
    await processScan(qrCodeMessage);
    nextStep();
}

function onScanError(errorMessage) {
    //handle scan error
}

const activeSection = function (id) {
    var section = document.getElementById(id);
    section.classList.remove('d-none');
}

const disableSection = function (id) {
    var section = document.getElementById(id);
    section.classList.add('d-none');
}

const processScan = async (qrCodeMessage) => {
    const response = await getSingleUser(qrCodeMessage);

    switch (response.status) {
        case 200:
            const user = response.data.data[0];
            manipulateData(user);
            break;

        case 404:
            console.log('User not found');
            renderScanningFail();
            break;

        case 500:
            console.log('Internal server error');
            renderCheckinFail();
            break;

        default:
            console.log('Error');
            break;
    }
}

const manipulateData = function (data) {
    document.getElementsByClassName('id-result-search')[0].innerText = data.ID;
    document.getElementsByClassName('name-result-search')[0].innerText = `${data.Nome} ${data.Sobrenome}`;
    document.getElementsByClassName('age-result-search')[0].innerText = getAge(data.DataNascimento);
    document.getElementsByClassName('telefone-result-search')[0].innerText = `(${data.DDD}) ${data.Telefone}`;
    document.getElementsByClassName('church-result-search')[0].innerText = data.Igreja;
    document.getElementsByClassName('email-result-search')[0].innerText = data.Email;
    document.getElementsByClassName('payment-result-search')[0].innerText = data.Pagamento;
}

const confirmCheckin = async () => {
    const response = await registerCheckin(IDUser);

    switch (response.status) {
        case 201:
            nextStep();
            break;

        case 500:
            renderCheckinFail();
            break;

        default:
            console.log('Error');
            break;
    }
}