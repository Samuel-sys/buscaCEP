const CEP = document.querySelector(".CEP");
const info = document.querySelector('.info');

async function fetchCEP() {
        //Realizamos uma consulta na API do viaCEP com o numero do CEP digitado
        const APIcep = await fetch(`https://viacep.com.br/ws/${CEP.value}/json/`);
        
        //retorna um arquivo json para o usuario
        return await APIcep.json();
}


function MostrarDados(CEPjson) {
    document.querySelector('iframe').src = `https://maps.google.com/maps?q=${CEPjson['cep']}&t=&z=19&ie=UTF8&output=embed`;
    //carrega a informações em todos os elemento HTML da pagina.
    document.querySelector('.logradouro').innerHTML = CEPjson['logradouro'];
    document.querySelector('.cep').innerHTML = CEPjson['cep'];
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