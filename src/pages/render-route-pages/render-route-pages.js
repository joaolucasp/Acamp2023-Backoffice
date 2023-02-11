const renderNotContent = function (routeActive) {
    disableSection(routeActive);
    activeSection('notContent');
}

const renderServerError = function (routeActive) {
    disableSection(routeActive);
    activeSection('serverError');
}

const disableSection = function (id) {
    var section = document.getElementById(id);
    section.classList.add('d-none');
}

const activeSection = function (id) {
    var section = document.getElementById(id);
    section.classList.remove('d-none');
}