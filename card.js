const $ = document.querySelector.bind(document);

const container = $(".container-grid");

const elemento = $("card-form");
const input = elemento.shadowRoot.getElementById("searchId");
const button = elemento.shadowRoot.getElementById("buttonId");

const card_endereco_deletar = $(".container-grid");

const imagens = {
  BA: "https://sindhospe.org.br/wp-content/uploads/2022/03/conheca-salvador-e-se-apaixone-pela-capital-baiana.jpeg",
  SP: "https://lp-cms-production.imgix.net/image_browser/shutterstockRF_153080222.jpg",
  PE: "https://www.nationsonline.org/gallery/Brazil/Recife-bridges.jpg",
  RJ: "https://media.staticontent.com/media/pictures/e63f71e3-03fb-4c1b-a1e6-c8b1586a7e73",
  MG: "https://direcional.com.br/wp-content/uploads/2021/08/minas-gerais-3.jpg",
  MA: "https://oimparcial.com.br/app/uploads/2017/05/sao-luis-maranhao-metro-quadrado-habitacao-15g-1.jpg",
  SC: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr2eL2z89fIRm-UqZLOfmUmlS_2YilvkvIMA&usqp=CAU",
  PR: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5zFlaiUJvRCBo4DisLfJTcSWq8GUBvaIKSg&usqp=CAU",
  RS: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS-PhFIAn6nInBp5ZW0Pd8X9O-0SAuYPxxwA&usqp=CAU",
  CE: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfX2bDsJ31B6q8rlaCQpgRnYTVmhjiZrNAwQ&usqp=CAU",
  GO: "https://www.sbd.org.br/wp-content/uploads/2021/09/a-9.jpg",
  AM: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBWY5EoMKucoPjA1UxMtLX_9iOclAcFawh1Q&usqp=CAU",
  MT: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYqNjW1ajtEkOf-H86QTAryObavNwdI1YFPg&usqp=CAU",
  SE: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_OimQxNoRjlcfQiyhHz8c9UNWRXn1PrhWkA&usqp=CAU",
};

//validacoes

const mensagemErro = [
  {
    tipo: "checaEntradaNumerica",
    valida: isNumeric,
    mensagem: "Digite apenas números",
  },
  {
    tipo: "checaTamanhoEntrada",
    valida: isTamanhoValido,
    mensagem: "O CEP precisa ter 8 caracteres",
  },
  {
    tipo: "checaCepJaExistente",
    valida: isCepInCard,
    mensagem: "O CEP já existe na lista",
  },
];

function isNumeric(entrada) {
  return /^[0-9]+$/gi.test(entrada);
}

function isTamanhoValido(entrada) {
  return entrada.length === 8;
}

function isCepInCard(cep) {
  const lista = recuperarLista("enderecos");

  const existe = lista.filter(
    (item) => item.cep.replace("-", "") === cep
  );

  return existe.length === 0;
}
//requisicoes

async function requisicao(cep) {
  const req = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

  const obj = await req.json();

  return { cep, ...obj };
}

// persistencia localstorage

let listaenderecos = recuperarLista("enderecos") || [];

function recuperarLista(chave) {
  return JSON.parse(localStorage.getItem(chave));
}

function persistirStorage(obj) {
  if (!recuperarLista("enderecos")) {
    localStorage.setItem("enderecos", JSON.stringify([]));
  }

  listaenderecos.push(obj);
  localStorage.setItem("enderecos", JSON.stringify(listaenderecos));
}

function limpaStorage() {
  localStorage.setItem("enderecos", JSON.stringify([]));
}

function removerCard(cep) {
  const tempLista = recuperarLista("enderecos");

  limpaStorage();

  listaenderecos = [];

  const novaLista = tempLista.filter((item) => item.cep != cep);

  novaLista.forEach((item) => persistirStorage(item));

  location.reload();
}

//eventos

card_endereco_deletar.addEventListener("mouseover", (e) => {
  const element = e.target.shadowRoot;

  if (element) {
    element
      .getElementById("deletar")
      .addEventListener("click", (e) => {
        e.preventDefault();

        const cep =
          e.target.parentNode.previousSibling.children[0].innerText.replace(
            /\D+/,
            ""
          );
        removerCard(cep);
      });
  }
});

input.addEventListener("keydown", (e) => {
  if (button.getAttribute("disabled")) destravarBotao();
  document.querySelector("card-form").nextElementSibling.innerHTML =
    "";
});

button.addEventListener("click", (e) => {
  e.preventDefault();

  const cep = input.value;

  const validacao = {
    checaEntradaNumerica: cep,
    checaTamanhoEntrada: cep,
    checaCepJaExistente: cep,
  };

  const erros = mensagemErro.filter(
    (erro) => !erro.valida(validacao[erro.tipo])
  );

  const listaErros =
    document.querySelector("card-form").nextElementSibling;

  if (erros.length > 0) {
    travaBotao();

    erros.forEach(({ mensagem }) => {
      listaErros.innerHTML += `<li>${mensagem}</li>`;
    });
  } else {
    update(cep);
  }

  input.value = "";
});

//renderização html

function requisicaoIndefinida(obj) {
  document.querySelector(
    "card-form"
  ).nextElementSibling.innerHTML = `<li>Cep inválido </li>`;
}

async function update(cep) {
  const resp = await requisicao(cep);

  if (Object.keys(resp).includes("erro")) {
    requisicaoIndefinida(resp);
    return;
  }

  persistirStorage(resp);

  renderizar();
}

function renderizar() {
  const lista = recuperarLista("enderecos");

  const obj = lista.map(
    ({ bairro, localidade, logradouro, uf, cep }) => {
      return `
          <card-endereco
          img_src="${imagens[uf]}"
          rua="Rua: ${logradouro}"
          cidadeEstado="${localidade} - ${uf} ${cep}"
          bairro="Bairro: ${bairro}"
        ></card-endereco>

  `;
    }
  );

  container.innerHTML =
    lista.length > 0
      ? obj.join(",")
      : "<h2 class='sem-card'>Ainda não há cards cep...</h2>";
}

function travaBotao() {
  elemento.shadowRoot
    .getElementById("buttonId")
    .setAttribute("disabled", "disabled");
}

function destravarBotao() {
  elemento.shadowRoot
    .getElementById("buttonId")
    .removeAttribute("disabled");
}
