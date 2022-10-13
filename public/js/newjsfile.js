

function sendData(className, method, action, redirection = false) {
    const inputTexteListe = document.getElementsByClassName(className);
    const methode = document.getElementsByClassName(method);
    const endpoint = document.getElementsByClassName(action);
    const redirect = (redirection) ? redirection : false;


    let TableOfInputText = ['text', 'password', 'date', 'tel', 'number', 'range'];

    let data = new FormData();
    
    for (let i = 0; i < inputTexteListe.length; i++) {
        let input = inputTexteListe[i];

        let inputType = input.getAttribute('type');
        let id = input.getAttribute('id');
        let name = input.getAttribute('name');

        if (TableOfInputText.includes(inputType)) {

            let value = input.value;

            if (value != '') {
                data.append(name, value)
            }
            else {
                ErrorOrSuccessAlert('error', name)
                break;
            }
        }
        else if (inputType === "checkbox") {
            data.append(name, input.getAttribute('checked'));
        }
        else if (inputType === "radio") {

            if (input.getAttribute('selected')) {
                data.append(name, input.value);
            }
        }
        else if (inputType === "file") {
            let nombreFichier = input.files.length
            let nomInput = name + '[]';

            if (nombreFichier > 0) {
                for (let a = 0; a < nombreFichier; a++) {

                    data.append(nomInput, input.files[0]);
                }
            }
            else{
                ErrorOrSuccessAlert('error', name)
            }


        }
        else if (inputType === "email") {
            var reg = /^[a-zA-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
            if (reg.test(input.value)) {
                data.append(name, input.value);
            }
            else {
                ErrorOrSuccessAlert('error', name)
                break;
            }
        }
    }

    // sendDataAlert();
}


function ErrorOrSuccessAlert(etat, champ = false) {
    Swal.fire({
        icon: `${etat}`,
        toast: true,
        position: 'top-end',
        text: `Le champ ${champ} n'est pas valide ou est vide`,
        showCloseButton: false,
        showConfirmButton: false,
        timerProgressBar: true,
        allowOutsideClick: false,
        timer: 1300
    })
}


function sendDataAlert() {
    Swal.fire({
        toast: true,
        position: 'top-end',
        text: `Vos données sont en cours de tratement`,
        showCloseButton: false,
        showConfirmButton: false,
        timerProgressBar: true,
        allowOutsideClick: false,
        timer: 1500
    })
}


function SuccessAlert(res) {
    Swal.fire({
        icon: `success`,
        toast: true,
        position: 'top-end',
        text: ` ${res} `,
        showCloseButton: false,
        showConfirmButton: false,
        timerProgressBar: true,
        allowOutsideClick: false,
        timer: 1500
    })
}


function ErrorAlert(res) {
    Swal.fire({
        icon: `error`,
        toast: true,
        position: 'top-end',
        text: `${res} `,
        showCloseButton: false,
        showConfirmButton: false,
        timerProgressBar: true,
        allowOutsideClick: false,
        timer: 1500
    })
}

