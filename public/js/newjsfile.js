

function sendData(className, method, action, redirection = false) {

    let loader = document.getElementById('conteneurLoad');
    

    const inputTexteListe = document.getElementsByClassName(className);
    const methode =method;
    const endpoint = action;
    const redirect = (redirection) ? redirection : false;
    let error = false;


    let TableOfInputText = ['text', 'password', 'date', 'tel', 'number', 'range'];

    let data = new FormData();

    for (let i = 0; i < inputTexteListe.length; i++) {

        let input = inputTexteListe[i];

        let inputType = input.getAttribute('type');
        let id = input.getAttribute('id');
        let name = id;//input.getAttribute('name');
        let listAttribute = input.attributes;
        let nbrAttribute = listAttribute.length;

        if (TableOfInputText.includes(inputType)) {

            let value = input.value;

            if (value != '') {
                data.append(name, value)
            }
            else {
                ErrorOrSuccessAlert('error', name)
                error = true
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
            else {
                ErrorOrSuccessAlert('error', name)
            }


        }
        else if (inputType === "email") {
            var reg = /^[a-zA-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
            if (reg.test(input.value)) {
                data.append(name, input.value);
            }
            else {
                input.setAttribute('style','border-color:"red"');
                // input.classList.add('border-danger')
                ErrorOrSuccessAlert('error', name)
                error = true
                break;
            }
        }
        else if(input.tagName==='TEXTAREA'){
            // console.log(input.tagName)
            let value = input.value;
            if (value != '') {
                data.append(name, value)
            }
            else {
                ErrorOrSuccessAlert('error', name)
                error = true
                break;
            }
        }
        else if(input.tagName==='BUTTON'){
            let value = input.value;
            if (value != '') {
                data.append(name, value)
            }
            else {
                ErrorOrSuccessAlert('error', name)
                error = true
                break;
            }

            
        }
        else if(input.tagName=== 'SELECT'){

            let value = input.value;
            if (value != '') {
                data.append(name, value)
            }
            else {
                let errormessage = `Veillez bien selectionner une option dans la liste`
                ErrorOrSuccessAlert('error', name,errormessage)
                error = true
                break;
            }
        }
    }


    setTimeout(() => {
        
        if (error === false) {
            loader.classList.contains('d-none')?loader.classList.remove('d-none'):'';


            sendDataAlert()
            $.ajax({
                url: endpoint,
                type: methode,
                data: data,
                dataType: 'json',
                contentType: false,
                processData: false,

                complete: (xhr, status) => {

                    loader.classList.contains('d-none')?"":loader.classList.add('d-none');
                    SuccessAlert('success')
                },
                success: (result, status, xhr) => {
                    loader.classList.contains('d-none')?"":loader.classList.add('d-none');
                    SuccessAlert(result)
                },
                error: (xhr, status, error) => {
                    loader.classList.contains('d-none')?"":loader.classList.add('d-none');
                    ErrorAlert('erreur lors de la connexion')
                }
            })
        }
    }, 500)
}


function ErrorOrSuccessAlert(etat, champ = false,texte='') {
    document.getElementById(champ).classList.add('border-danger')
    let message = (texte==='')?`Le champ ${champ} n'est pas valide ou est vide`:texte;
    Swal.fire({
        icon: `${etat}`,
        toast: true,
        position: 'top-end',
        text: message,
        showCloseButton: false,
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000
    })
    setTimeout(()=>{
            document.getElementById(champ).classList.contains('border-danger')?document.getElementById(champ).classList.remove('border-danger'):'';

    },3000)
}


function sendDataAlert() {
    Swal.fire({
        toast: true,
        position: 'top-end',
        text: `Vos données sont en cours de tratement`,
        showCloseButton: false,
        showConfirmButton: false,
        timerProgressBar: true,
       
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
        timer: 1500
    })
}



