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
    await processFind(qrCodeMessage);
}

async function onCodeSuccess(qrCodeMessage) {
    IDUser = qrCodeMessage;
    await processFind(qrCodeMessage);
}

async function findName(name) {
    await processFind(name);
}

function onScanError(errorMessage) {
    //handle scan error
}

const processFind = async (query) => {
    spinner.on();
    const routeActive = getRouteActive();
    disableSection(routeActive);

    let response;
    routeActive === 'nameRoute' ? response = await getAllUsers(`name=${query}`) : response = await getSingleUser(query);

    switch (response.status) {
        case 200:
            if (routeActive === 'nameRoute') {
                if (response.data.totalItems === 0) {
                    nextScreen = 'notContent';
                } else {
                    const users = response.data.data;
                    manipulateAllData(users);
                    nextScreen = 'tableView';
                    setCssExtendContent();
                }
            } else {
                const user = response.data.data[0];
                manipulateSingleData(user);
                nextScreen = 'camperView';
                setCssExtendContent();
            }
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

const confirmCheckin = async () => {
    spinner.on();
    disableSection('camperView');
    const response = await registerCheckin(IDUser);

    switch (response.status) {
        case 201:
            nextScreen = 'checkinSuccess';
            setCssExtendContent();
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

const camperView = async (id) => {
    let idSimplify = id.split('-')[1];
    spinner.on();
    disableSection('tableView');
    const response = await getSingleUser(idSimplify);

    switch (response.status) {
        case 200:
            const user = response.data.data[0];
            IDUser = user.ID;
            manipulateSingleData(user);
            nextScreen = 'camperView';
            setCssExtendContent();
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
