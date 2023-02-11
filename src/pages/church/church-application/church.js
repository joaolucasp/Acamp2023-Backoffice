const tableSection = document.getElementById('tableView');
const spinner = document.getElementById('spinner');

window.addEventListener('load', async () => {
    await getTableData('checkin=true');
    spinner.classList.add('d-none');
});

const getTableData = async (params) => {
    const response = await getAllUsers(params);

    switch (response.status) {
        case 200:
            if (response.data.totalItems === 0) {
                renderNotContent('tableView');
                return;
            }

            const users = response.data.data;
            manipulateAllData(users);
            tableSection.classList.remove('d-none');
            break;

        case 500:
            console.log('Internal server error');
            renderServerError();
            break;

        default:
            console.log('Error');
            break;
    }
}

const manipulateAllData = function (data) {
    const table = document.getElementById('multipleResultSearch');

    for (let i = 0; i < data.length; i++) {
        createRow(table, data, i);
    }
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

    row.appendChild(id);
    row.appendChild(name);
    row.appendChild(church);

    table.appendChild(row);
}
