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
    processScan(qrCodeMessage);
    nextStep();
    html5QrcodeScanner.clear();
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
            break;

        case 500:
            console.log('Internal server error');
            break;

        default:
            console.log('Error');
            break;
    }
}

processScan('JIE1');

const manipulateData = function (data) {
    document.getElementsByClassName('id-result-search')[0].innerText = data.ID;
    document.getElementsByClassName('name-result-search')[0].innerText = data.Nome;
    document.getElementsByClassName('age-result-search')[0].innerText = data.DataNascimento;
    document.getElementsByClassName('telefone-result-search')[0].innerText = `(${data.DDD}) ${data.Telefone}`;
    document.getElementsByClassName('church-result-search')[0].innerText = data.Igreja;
    document.getElementsByClassName('email-result-search')[0].innerText = data.Email;
    document.getElementsByClassName('payment-result-search')[0].innerText = data.Pagamento;
}