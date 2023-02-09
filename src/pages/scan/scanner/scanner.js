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
    nextStep();
    html5QrcodeScanner.clear();
}
function onScanError(errorMessage) {
    //handle scan error
}

const activeSection = function(id) {
    var section = document.getElementById(id);
    section.classList.remove('d-none');
}

const disableSection = function(id) {
    var section = document.getElementById(id);
    section.classList.add('d-none');
}