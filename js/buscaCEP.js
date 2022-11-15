const CEP = document.querySelector(".CEP");
const buscar = document.querySelector(".buscar");
const info = document.querySelector('.info');

buscar.addEventListener('click', async () => {
    //Se o Usuario digitar mais que 8 caracteres ou menos que 8 caracteres ele não teraliza a consulta na API
    if (CEP.value.length != 8) {
        window.alert("O CEP tem no minimo/maximo 8 catacteres");
        return;
    }


    let data = await fetchCEP();

    //Verifica se o CEP e valido ou não
    if (data.erro) {
        limparDados();
        setTimeout(() => window.alert("CEP não cadastrado")
            , 100);
    }
    else { MostrarDados(data); }
});

async function fetchCEP() {
    try {
        
        //Realizamos uma consulta na API do viaCEP com o numero do CEP digitado
        const APIcep = await fetch(`https://viacep.com.br/ws/${CEP.value}/json/`);
        
        //retorna um arquivo json para o usuario
        return await APIcep.json();
        
    } catch (error) {
        return data.erro = true;
    }

}


function MostrarDados(CEPjson) {

    //carrega a informações em todos os elemento HTML da pagina.
    document.querySelector('.logradouro').innerHTML = CEPjson['logradouro'];
    document.querySelector('.bairro').innerHTML = CEPjson['bairro'];
    document.querySelector('.complemento').innerHTML = CEPjson['complemento'];
    document.querySelector('.ddd').innerHTML = CEPjson['ddd'];
    document.querySelector('.ibge').innerHTML = CEPjson['ibge'];
    document.querySelector('.localidade').innerHTML = CEPjson['localidade'];
    document.querySelector('.siafi').innerHTML = CEPjson['siafi'];
    document.querySelector('.uf').innerHTML = CEPjson['uf'];

    console.log(CEPjson);
}

function limparDados() {
    let b = document.querySelectorAll('b');

    for (let x = 0; x < b.length; x++) {
        b[x].innerHTML = "";

    }
}

function createElement(tag, clase) {
    //Cria um elemento que só existe dentro da função
    let element = document.createElement(tag);
    //Caso o usuario informe uma classe ele adiciona, caso não ele não adiciona nenhuma classe
    if (clase) element.className = clase;

    return element;
}