const info = document.querySelector('.info');
const endereco = document.querySelector('.endereco');
const stats = document.querySelector('.status');

search.addEventListener('click', async () => {
    //Coloca uma tela de loading
    endereco.appendChild(loading);

    //Se o CEP informado não tiver 8 carácteres 
    if (CEP.value.length != 8 & radio[changeForm()].value === 'CEP') {
        stats.innerHTML = "O CEP tem no minimo 8 catacteres";
        clearInfo();
    }
    //Se o Usuário digitar qualquer coisa que não seja numero
    else if (isNaN(CEP.value) || CEP.value.includes('.') & radio[changeForm()].value === 'CEP') {
        stats.innerHTML = "Entre somente com os numeros";
        clearInfo();
    }

    //Não entrando em nenhum dos casos de filtro de condição que possa acarretar erro ele inicia a consulta do CEP na API
    else {
        //Limpando a div que informa algum erro na consulta
        stats.innerHTML = "";

        let data = await fetchCEP();

        //Verifica se o CEP e valido ou não
        if (data.erro) {
            clearInfo();
            setTimeout(() => stats.innerHTML = "CEP não cadastrado"
                , 100);
        }
        else {
            //carrega as informações do Endereço do usuario
            rederInfo(data);
            stats.innerHTML = "";
        }
    }

    //Remove uma tela de loading
    endereco.removeChild(loading);
});

async function fetchCEP() {

    //Realizamos uma consulta na API do viaCEP com o numero do CEP digitado
    const APIcep = radio[changeForm()].value === 'CEP' ?
        await fetch(`https://viacep.com.br/ws/${CEP.value}/json/`)
        :
        await fetch(`https://viacep.com.br/ws/${uf.value}/${bairro.value}/${logradouro.value}/json/`);

    let x = await APIcep.json();

    //retorna um arquivo json para o usuario
    if (Array.isArray(x)) return x[0];
    else return x;
}


function rederInfo(CEPjson) {
    console.log(CEPjson);

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
}

function clearInfo() {
    let b = document.querySelectorAll('b');

    for (let x = 0; x < b.length; x++) {
        b[x].innerHTML = "";

    }
}