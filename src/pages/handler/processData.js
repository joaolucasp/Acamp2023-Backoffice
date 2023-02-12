let IDUser = 0;
let nextScreen;
const spinner = new Spinner();
const tableSection = document.getElementById('tableView');

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
    await processFind('simplify', qrCodeMessage);
}

async function onCodeSuccess(displayMethod, qrCodeMessage) {
    IDUser = qrCodeMessage;
    await processFind(displayMethod, qrCodeMessage);
}

function onScanError(errorMessage) {
    //handle scan error
}

const processFind = async (displayMethod, query) => {
    spinner.on();
    const routeActive = getRouteActive();
    disableSection(routeActive);

    switch (routeActive) {
        case 'nameRoute':
            response = await getAllUsers(`name=${query}`)
            break;

        case 'churchRoute':
            response = await getUsersByChurch(query)
            break;

        case 'tableView':
            response = await getAllUsers(query);
            break;

        default:
            response = await getSingleUser(query);
            break;
    }

    switch (response.status) {
        case 200:
            if (routeActive === 'nameRoute' || routeActive === 'churchRoute' || routeActive === 'tableView') {
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
                manipulateSingleData(displayMethod, user);
                nextScreen = 'camperView';
                displayMethod == 'complete' ? setCssExtendContent() : setCssDefaultContent();
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
            setCssDefaultContent();
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
            manipulateSingleData('complete', user);
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

const renderTable = async () => {
    spinner.on();
    await processFind('complete', 'checkin=true');
}

const findCamperByChurch = async (church) => {
    disableSection('churchRoute');
    spinner.on();
    await processFind('complete', `ALL?church=${church}`);
}