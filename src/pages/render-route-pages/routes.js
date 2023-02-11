function firstRoute() {
    localStorage.getItem('route-scan') == 'codeRoute' ? activeSection('codeRoute') : activeScannerScreen();
}

const nextStep = function (screen) {
    switch (screen) {
        case 'tableView':
            activeSection('tableView');
            break;

        case 'camperView':
            activeSection('camperView');
            break;

        case 'notFound':
            activeSection('notFound');
            break;

        case 'checkinSuccess':
            activeSection('checkinSuccess');
            break;

        case 'notContent':
            activeSection('notContent');

        case 'serverError':
            activeSection('serverError');
            break;

        default:
            break;
    }
}

const backStep = function () {
    const pageContent = document.getElementById('pageContent');

    for (let section in pageContent.children) {
        if (!pageContent.children[section].classList.contains('d-none')) {
            if (pageContent.children[section].id == 'scannerScreen' || pageContent.children[section].id == 'codeRoute') {
                disableSection(pageContent.children[section].id);
                window.location.href = '../scan.html';

            } else {
                console.log("oi")
                disableSection(pageContent.children[section].id);
                firstRoute();
            }

            return;
        }
    }
}

const activeSection = function (id) {
    var section = document.getElementById(id);
    section.classList.remove('d-none');
}

const disableSection = function (id) {
    var section = document.getElementById(id);
    section.classList.add('d-none');
}