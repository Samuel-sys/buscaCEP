const form = document.querySelector('form');
const radio = document.getElementsByName('type');
const search = createElement('button', 'search', "Busca");
const CEP = createElement('input', 'CEP');
const logradouro = createElement('input', 'logradouro');
const bairro = createElement('input', 'bairro');
const uf = createUF();



const mapscreen = document.querySelector('.mapscreen');
const map = document.querySelector('.map');

const loading = createElement('div', 'loading');

function createUF(){
    let uf = createElement('select');

    const arrayStates = [
        { value: 'AC', label: 'Acre' },
        { value: 'AL', label: 'Alagoas' },
        { value: 'AP', label: 'Amapá' },
        { value: 'AM', label: 'Amazonas' },
        { value: 'BA', label: 'Bahia' },
        { value: 'CE', label: 'Ceará' },
        { value: 'DF', label: 'Distrito Federal' },
        { value: 'ES', label: 'Espírito Santo' },
        { value: 'GO', label: 'Goiás' },
        { value: 'MA', label: 'Maranhão' },
        { value: 'MT', label: 'Mato Grosso' },
        { value: 'MS', label: 'Mato Grosso do Sul' },
        { value: 'MG', label: 'Minas Gerais' },
        { value: 'PA', label: 'Pará' },
        { value: 'PB', label: 'Paraíba' },
        { value: 'PR', label: 'Paraná' },
        { value: 'PE', label: 'Pernambuco' },
        { value: 'PI', label: 'Piauí' },
        { value: 'RJ', label: 'Rio de Janeiro' },
        { value: 'RN', label: 'Rio Grande do Norte' },
        { value: 'RS', label: 'Rio Grande do Sul' },
        { value: 'RO', label: 'Rondônia' },
        { value: 'RR', label: 'Roraima' },
        { value: 'SC', label: 'Santa Catarina' },
        { value: 'SP', label: 'São Paulo' },
        { value: 'SE', label: 'Sergipe' },
        { value: 'TO', label: 'Tocantins' }
    ];

    for (let index = 0; index < arrayStates.length; index += 1) {
        const option = arrayStates[index];
        const createOptions = document.createElement('option');
        createOptions.innerText = option['label'];
        createOptions.value = option['value'];
        uf.appendChild(createOptions);
    }

    return uf;
}

//Volta o ID do elemento HTML (radio) que foi selecionado informando se o usuario que consultar pelo CEP ou pelo Logradouro 
function changeForm() { return radio[0].checked ? 0 : 1; }

function renderForm() {

    //Puxa todos os elemento HTML label do sistema
    let label = document.querySelectorAll('label');

    //Remove todos elementos HTML label do sistema
    for (let x = 0; x < label.length || form.contains(label[0]); x++) {
        form.removeChild(label[x]);
    }

    //Se o usuario quiser consulta pelo CEP
    if (radio[changeForm()].value === 'CEP') {

        //Criação do label para o CEP
        label = createElement('label');
        label.innerHTML = 'CEP';

        CEP.required = true;
        label.appendChild(CEP); //Adicionamos o Elemento HTML responsavel pelo CEP (input)
        form.appendChild(label);
    }
    else {

        //Criação do label para o logradouro
        label = createElement('label');
        label.innerHTML = 'Logradouro';
        logradouro.placeholder = 'Rua, Avenida ....';
        logradouro.required = true
        label.appendChild(logradouro);//Adicionamos o Elemento HTML responsavel pelo logradouro (input)
        form.appendChild(label);

        label = createElement('label');
        label.innerHTML = 'Bairro';
        label.appendChild(bairro);//Adicionamos o Elemento HTML responsavel pelo bairro (input)
        bairro.required = true
        form.appendChild(label);

        label = createElement('label');
        label.innerHTML = 'Estado';
        label.appendChild(uf); //Adicionamos o Elemento HTML responsavel pelo Estado (input select)
        form.appendChild(label);
    }
    form.appendChild(search);
}

mapscreen.addEventListener('click', function () {
    map.classList.toggle('mapfull');
    map.classList.toggle('mapsmall');

    mapscreen.classList.toggle('full');
    mapscreen.classList.toggle('small');
});


function createElement(tag, clase, innerHTML = "") {
    //Cria um elemento que só existe dentro da função
    let element = document.createElement(tag);
    //Caso o usuario informe uma classe ele adiciona, caso não ele não adiciona nenhuma classe
    if (clase) element.className = clase;

    if (innerHTML) element.innerHTML = innerHTML;

    return element;
}

window.onload = function () {
    renderForm();
}