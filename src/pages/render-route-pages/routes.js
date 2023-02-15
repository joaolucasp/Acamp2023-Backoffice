function firstRoute() {
    const firstRoute = localStorage.getItem('first-route');

    switch (firstRoute) {
        case 'find-by-name-route':
            activeSection('nameRoute');
            break;

        case 'find-by-code-route':
            activeSection('codeRoute');
            break;

        case 'find-by-scanner-route':
            activeScannerScreen();
            break;

        case 'find-by-church-route':
            activeSection('churchRoute');
            break;

        case 'get-all-checkins-route':
            renderTable();
            break;

        default:
            break;
    }

    activeItemBottomMenu();
}

const activeItemBottomMenu = function () {
    const module = localStorage.getItem('module');
    const bottomMenu = document.getElementById('bottomMenu');

    switch (module) {
        case 'checkin':
            const linkCheckin = bottomMenu.getElementsByClassName('item-menu')[0];
            linkCheckin.classList.add('actived');
            break;

        case 'camper':
            const linkcamper = bottomMenu.getElementsByClassName('item-menu')[1];
            linkcamper.classList.add('actived');
            break;

        case 'church':
            const linkchurch = bottomMenu.getElementsByClassName('item-menu')[2];
            linkchurch.classList.add('actived');
            break;

        default:
            break
    }
}

const renderModule = function () {
    const module = localStorage.getItem('module');

    switch (module) {
        case 'checkin':
            window.location.href = '../checkin/checkin.html';
            break;

        case 'camper':
            window.location.href = '../camper/camper.html';
            break;

        case 'church':
            window.location.href = '../church/church.html';
            break;

        default:
            break;
    }
}

const nextStep = function (screen) {
    switch (screen) {
        case 'tableView':
            activeSection('tableView');

            if (localStorage.getItem('first-route') == 'get-all-checkins-route') {
                activeSection('btnClipboard')
            }
            break;

        case 'camperViewComplete':
            activeSection('camperViewComplete');
            break;

        case 'camperViewSimplify':
            activeSection('camperViewSimplify');
            break;

        case 'notFound':
            activeSection('notFound');
            break;

        case 'checkinSuccess':
            activeSection('checkinSuccess');
            break;

        case 'checkoutSuccess':
            activeSection('checkoutSuccess');
            break;

        case 'notContent':
            activeSection('notContent');
            break;

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
            switch (pageContent.children[section].id) {
                case 'nameRoute':
                    disableSection('nameRoute');
                    window.location.href = '../camper/camper.html';
                    break;

                case 'codeRoute':
                    disableSection('codeRoute');
                    localStorage.getItem('module') == 'checkin' ? window.location.href = '../checkin/checkin.html' : window.location.href = '../camper/camper.html';
                    break;

                case 'scannerScreen':
                    disableSection('scannerScreen');
                    localStorage.getItem('module') == 'checkin' ? window.location.href = '../checkin/checkin.html' : window.location.href = '../camper/camper.html';
                    break;

                case 'churchRoute':
                    disableSection('churchRoute');
                    window.location.href = '../church/church.html';
                    break;

                case 'tableView':
                    disableSection('tableView');
                    setCssDefaultContent();
                    clearTable();
                    
                    switch (localStorage.getItem('module')) {
                        case 'camper':
                            activeSection('nameRoute');
                            break;

                        case 'church':
                            localStorage.getItem('first-route') == 'find-by-church-route' ? activeSection('churchRoute') : window.location.href = '../church/church.html';
                            break;

                        default:
                            break;
                    }

                    break;

                case 'camperViewComplete':
                    disableSection('camperViewComplete');

                    switch (localStorage.getItem('first-route')) {
                        case 'find-by-code-route':
                            activeSection('codeRoute');
                            setCssDefaultContent();
                            break;

                        case 'find-by-scanner-route':
                            setCssDefaultContent();
                            activeScannerScreen();
                            break;

                        default:
                            activeSection('tableView')
                            break;
                    }

                    break;

                case 'camperViewSimplify':
                    disableSection('camperViewSimplify');
                    setCssDefaultContent();
                    localStorage.getItem('first-route') == 'find-by-scanner-route' ? activeScannerScreen() : activeSection('codeRoute');
                    break;

                default:
                    const moduleActive = localStorage.getItem('module');
                    switch (moduleActive) {
                        case 'checkin':
                            window.location.href = '../checkin/checkin.html';
                            break;

                        case 'camper':
                            window.location.href = '../camper/camper.html';
                            break;

                        case 'church':
                            window.location.href = '../church/church.html';
                            break;

                        default:
                            break;
                    }
                    break;

            }

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

const getRouteActive = function () {
    const routeActive = localStorage.getItem('first-route');
    let route = '';

    switch (routeActive) {
        case 'find-by-name-route':
            route = 'nameRoute';
            break;

        case 'find-by-code-route':
            route = 'codeRoute';
            break;

        case 'find-by-scanner-route':
            route = 'scannerScreen';
            break;

        case 'find-by-church-route':
            route = 'churchRoute';
            break;

        case 'get-all-checkins-route':
            route = 'tableView';
            break;

        default:
            break;
    }
    return route;
}

const setRoute = function (route) {
    localStorage.setItem('first-route', route);
}

function setModuleSelector(module) {
    localStorage.setItem('module', module);
}