window.onload = function () {
    html5QrcodeScanner = new Html5QrcodeScanner(
        "scannerScreen",
        {
            "fps": 10,
            "qrbox": 200,
            "aspectRatio": 1,
        }
    );
    html5QrcodeScanner.render(onScanSuccess, onScanError);
}

async function onScanSuccess(qrCodeMessage) {
    console.log(qrCodeMessage);
}
function onScanError(errorMessage) {
    //handle scan error
}