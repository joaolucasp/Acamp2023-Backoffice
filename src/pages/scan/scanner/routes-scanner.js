function firstRoute() {
    localStorage.getItem('route-scan') == 'code' ? activeSection('codeRoute') : activeScannerScreen();
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
            switch (pageContent.children[section].id) {
                case 'scannerScreen' || 'codeRoute':
                    disableSection(pageContent.children[section].id);
                    window.location.href = '../scan.html';
                    break;

                case 'scanningSuccess' || 'scanningFail':
                    disableSection(pageContent.children[section].id);
                    firstRoute();
                    break;

                default:
                    break;

            }
            return;
        }
    }

}
