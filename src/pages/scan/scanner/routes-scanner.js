function firstRoute() {
    localStorage.getItem('route-scan') == 'codeRoute' ? activeSection('codeRoute') : activeScannerScreen();
}

firstRoute();

const nextStep = function () {
    const pageContent = document.getElementById('pageContent');

    for (let section in pageContent.children) {
        if (!pageContent.children[section].classList.contains('d-none')) {

            switch (pageContent.children[section].id) {

                case 'scannerScreen':
                    disableSection(pageContent.children[section].id);
                    activeSection('scanningSuccess');
                    break;

                case 'codeRoute':
                    disableSection(pageContent.children[section].id);
                    activeSection('scanningSuccess');
                    break;

                case 'scanningSuccess':
                    disableSection(pageContent.children[section].id);
                    disableSection('backButton');
                    activeSection('checkinSuccess');
                    break;

                default:
                    break;
            }
            return;
        }
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
                disableSection(pageContent.children[section].id);
                firstRoute();
            }

            return;
        }
    }
}

const renderScanningFail = function () {
    const routeActive = localStorage.getItem('route-scan');
    disableSection(routeActive);
    activeSection('scanningFail');
}

const renderCheckinFail = function () {
    const routeActive = localStorage.getItem('route-scan');
    disableSection(routeActive);
    activeSection('checkinFail');
}
