class Spinner {
    constructor() {
        const pageContent = document.getElementById('pageContent');
        this.spinner = document.createElement('div');
        this.spinner.setAttribute('id', 'spinner');
        this.spinner.classList.add('d-flex', 'text-primary', 'd-none', 'justify-content-center');
        
        const divSpinner = document.createElement('div');
        divSpinner.classList.add('spinner-border');
        this.spinner.setAttribute('role', 'status');

        const divSpan = document.createElement('span');
        divSpan.classList.add('visually-hidden');
        divSpan.innerHTML = 'Loading...';

        divSpinner.appendChild(divSpan);
        this.spinner.appendChild(divSpinner);
        pageContent.appendChild(this.spinner);
    }

    on() {
        this.spinner.classList.remove('d-none');
    }

    off() {
        this.spinner.classList.add('d-none');
    }
}

module.exports = Spinner;