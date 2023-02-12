const tableSection = document.getElementById('tableView');
const spinner = new Spinner();
let IDUser = 0;
let nextScreen;

const renderTable = async () => {
    spinner.on();
    await getTableData('user', 'checkin=true');
}

const findCamperByChurch = async (church) => {
    disableSection('churchRoute');
    spinner.on();
    await getTableData('church', `ALL?church=${church}`);
}

const getTableData = async (module, params) => {
    let response;
    module == 'church' ? response = await getUsersByChurch(params) : response = await getAllUsers(params);;

    switch (response.status) {
        case 200:
            if (response.data.totalItems === 0) {
                nextScreen = 'notContent';
                
            } else{
                const users = response.data.data;
                manipulateAllData(users);
                nextScreen = 'tableView';
                setCssExtendContent();
            }
           
            break;

        case 500:
            console.log('Internal server error');
            nextScreen = 'serverError';
            break;

        default:
            console.log('Error');
            break;
    }

    spinner.off()
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
