const endereco = document.querySelector('.endereco');
const buscar = document.querySelector(".buscar");
const stats = document.querySelector('.status');

const loading = createElement('div', 'loading');

buscar.addEventListener('click', async () => {
    //Coloca uma tela de loading
    endereco.appendChild(loading);

    //Se o CEP informado não tiver 8 carácteres 
    if (CEP.value.length != 8) {
        stats.innerHTML = "O CEP tem no minimo 8 catacteres";
        limparDados();
    } 
    //Se o Usuário digitar qualquer coisa que não seja numero
    else if (isNaN(CEP.value) || CEP.value.includes('.')) {
        stats.innerHTML = "Entre somente com os numeros";
        limparDados();
    }

    //Não entrando em nenhum dos casos de filtro de condição que possa acarretar erro ele inicia a consulta do CEP na API
    else {
        //Limpando a div que informa algum erro na consulta
        stats.innerHTML = "";

        let data = await fetchCEP();

        //Verifica se o CEP e valido ou não
        if (data.erro) {
            limparDados();
            setTimeout(() => stats.innerHTML = "CEP não cadastrado"
                , 100);
        }
        else {
            //carrega as informações do Endereço do usuario
            MostrarDados(data);
            stats.innerHTML = "";
        }
    }

    //Remove uma tela de loading
    endereco.removeChild(loading);
});