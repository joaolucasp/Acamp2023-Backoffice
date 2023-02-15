let camperViewTable = document.getElementById('camperView');

const manipulateSingleData = function (displayMethod, data) {
    displayMethod === 'complete' ?  camperViewTable = document.getElementById('camperViewComplete') : camperViewTable = document.getElementById('camperViewSimplify');

    camperViewTable.getElementsByClassName('id-result-search')[0].innerText = data.ID;
    camperViewTable.getElementsByClassName('name-result-search')[0].innerText = `${data.Nome} ${data.Sobrenome}`;
    camperViewTable.getElementsByClassName('age-result-search')[0].innerText = getAge(data.DataNascimento);
    
    if(getAge(data.DataNascimento) >= 18){
        document.getElementById('rowAdultResponsible1').classList.add('d-none');
        document.getElementById('rowAdultResponsible2').classList.add('d-none');
    } else {
        camperViewTable.getElementsByClassName('adult-result-search')[0].innerText = data.NomeResponsavel;
        document.getElementById('rowAdultResponsible1').classList.remove('d-none');
        document.getElementById('rowAdultResponsible2').classList.remove('d-none');
    }

    camperViewTable.getElementsByClassName('telefone-result-search')[0].innerText = `(${data.DDD}) ${data.Telefone}`;
    camperViewTable.getElementsByClassName('church-result-search')[0].innerText = data.Igreja;
    camperViewTable.getElementsByClassName('email-result-search')[0].innerText = data.Email;
    camperViewTable.getElementsByClassName('payment-result-search')[0].innerText = data.Pagamento;

    if (displayMethod === 'complete') {
        camperViewTable.getElementsByClassName('surname-result-search')[0].innerText = data.Apelido;
        camperViewTable.getElementsByClassName('allergy-result-search')[0].innerText = data.Alergias;
        camperViewTable.getElementsByClassName('medicines-result-search')[0].innerText = data.Remedios;

        // Checkin fluxes
        if (data.Checkin) {
            camperViewTable.getElementsByClassName('checkin-result-search')[0].innerText = data.Checkin;
            document.getElementById('rowCheckin').classList.remove('d-none');
            document.getElementById('checkinButton').classList.add('d-none');

            if(data.Checkout) {
                camperViewTable.getElementsByClassName('checkout-result-search')[0].innerText = data.Checkout;
                document.getElementById('rowCheckout').classList.remove('d-none');
                document.getElementById('checkoutButton').classList.add('d-none');
            } else {
                document.getElementById('checkoutButton').classList.remove('d-none');
                document.getElementById('rowCheckout').classList.add('d-none');
            }

        } else {
            document.getElementById('rowCheckin').classList.add('d-none');
            document.getElementById('rowCheckout').classList.add('d-none');
            document.getElementById('checkinButton').classList.remove('d-none');
            document.getElementById('checkoutButton').classList.add('d-none');
        }
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

    row.setAttribute('id', `row-${data[position].ID}`);
    row.setAttribute('onclick', `camperView(id)`);

    row.appendChild(id);
    row.appendChild(name);
    row.appendChild(church);

    table.appendChild(row);
}

const clearTable = function () {
    const table = document.getElementById('multipleResultSearch');
    
    for (let i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }
}