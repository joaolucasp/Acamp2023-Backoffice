const tableSection = document.getElementById('tableView');
const spinner = new Spinner();
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
            manipulateData(user);
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

const manipulateAllData = function (data) {
    const table = document.getElementById('multipleResultSearch');

    for (let i = 0; i < data.length; i++) {
        createRow(table, data, i);
    }
}

const manipulateData = function (data) {
    let camperViewTable = document.getElementById('camperView');

    camperViewTable.getElementsByClassName('id-result-search')[0].innerText = data.ID;
    camperViewTable.getElementsByClassName('name-result-search')[0].innerText = `${data.Nome} ${data.Sobrenome}`;
    camperViewTable.getElementsByClassName('surname-result-search')[0].innerText = data.Apelido;
    camperViewTable.getElementsByClassName('age-result-search')[0].innerText = getAge(data.DataNascimento);
    getAge(data.DataNascimento) < 18 ? camperViewTable.getElementsByClassName('adult-result-search')[0].innerText = data.NomeResponsavel : document.getElementById('rowAdultResponsible').classList.add('d-none');
    camperViewTable.getElementsByClassName('telefone-result-search')[0].innerText = `(${data.DDD}) ${data.Telefone}`;
    camperViewTable.getElementsByClassName('church-result-search')[0].innerText = data.Igreja;
    camperViewTable.getElementsByClassName('email-result-search')[0].innerText = data.Email;
    camperViewTable.getElementsByClassName('payment-result-search')[0].innerText = data.Pagamento;
    camperViewTable.getElementsByClassName('checkin-result-search')[0].innerText = data.Checkin;
    camperViewTable.getElementsByClassName('allergy-result-search')[0].innerText = data.Alergias;
    camperViewTable.getElementsByClassName('medicines-result-search')[0].innerText = data.Remedios;
}

const createRow = function (table, data, position) {
    let row = document.createElement('tr');
    let id = document.createElement('td');
    let name = document.createElement('td');
    let church = document.createElement('td');

    id.classList.add('id-result-search', 'row-table', 'fw-bold');
    name.classList.add('name-result-search', 'row-table');
    church.classList.add('church-result-search', 'row-table');

    id.innerHTML = data[position].ID;
    name.innerHTML = `${data[position].Nome} ${data[position].Sobrenome}`;
    church.innerHTML = data[position].Igreja;

    row.setAttribute('id', `row-${data[position].ID}`);
    row.setAttribute('onclick', `camperView(id)`);

    row.appendChild(id);
    row.appendChild(name);
    row.appendChild(church);

    table.appendChild(row);
}