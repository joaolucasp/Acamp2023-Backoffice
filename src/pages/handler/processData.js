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
    await processFind(qrCodeMessage);
}

async function onCodeSuccess(codeMessage) {
    IDUser = codeMessage;
    await processFind(codeMessage);
}

function onScanError(errorMessage) {
    //handle scan error
}

const processFind = async (query) => {
    spinner.on();
    const routeActive = getRouteActive();
    const moduleActive = localStorage.getItem('module');
    disableSection(routeActive);

    const response = await getResponseBasedOnRoute(routeActive, query);

    switch (response.status) {
        case 200:
            if (response.data.totalItems === 0) {
                nextScreen = 'notContent';
                break;
            }

            if (routeActive === 'nameRoute' || routeActive === 'churchRoute' || routeActive === 'tableView') {
                const users = response.data.data;
                manipulateAllData(users);
                nextScreen = 'tableView';
                setCssExtendContent();

            } else {
                const user = response.data.data[0];
                let displayMethod;

                moduleActive === 'checkin' ? displayMethod = 'simplify' : displayMethod = 'complete';

                manipulateSingleData(displayMethod, user);

                if (displayMethod == 'complete') {
                    nextScreen = 'camperViewComplete';
                    setCssExtendContent()
                } else {
                    nextScreen = 'camperViewSimplify';
                    setCssDefaultContent();
                }
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

const getResponseBasedOnRoute = async (routeActive, query) => {
    let response;

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

    return response;
}

const confirmCheckin = async () => {
    spinner.on();
    localStorage.getItem('module') === 'checkin' ? disableSection('camperViewSimplify') : disableSection('camperViewComplete');
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

const confirmCheckout = async () => {
    spinner.on();
    localStorage.getItem('module') === 'checkin' ? disableSection('camperViewSimplify') : disableSection('camperViewComplete');
    const response = await registerCheckout(IDUser);

    switch (response.status) {
        case 201:
            nextScreen = 'checkoutSuccess';
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
            nextScreen = 'camperViewComplete';
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
    await processFind('checkin=true');
}

const findCamperByChurch = async (church) => {
    disableSection('churchRoute');
    spinner.on();
    await processFind(`ALL?church=${church}`);
}