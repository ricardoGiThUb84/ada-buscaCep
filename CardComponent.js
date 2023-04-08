class CardComponent extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    shadow.appendChild(this.load());
    shadow.appendChild(this.style());
  }

  load() {
    const buildElement = document.createElement.bind(document);
    const getElement = document.querySelector.bind(document);

    const card_elementsInfo = buildElement("div");
    card_elementsInfo.className = "card-elements__info";
    const h3 = buildElement("h3");
    const paragrafoRua = buildElement("p");
    const paragrafoBairro = buildElement("p");

    paragrafoRua.innerHTML = this.getAttribute("rua");
    h3.innerHTML = this.getAttribute("cidadeEstado");

    paragrafoBairro.innerHTML = this.getAttribute("bairro");

    const div_fechar = buildElement("div");
    div_fechar.setAttribute("id", "deletar");
    const btn_fechar = buildElement("button");
    btn_fechar.textContent = "X";

    div_fechar.appendChild(btn_fechar);

    card_elementsInfo.appendChild(h3);
    card_elementsInfo.appendChild(paragrafoRua);
    card_elementsInfo.appendChild(paragrafoBairro);

    const card_elements = buildElement("div");

    card_elements.className = "card-elements";
    const img = buildElement("img");
    img.src =
      this.getAttribute("img_src") ||
      "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png";

    card_elements.appendChild(img);
    card_elements.appendChild(card_elementsInfo);

    card_elements.appendChild(div_fechar);

    const container_card = buildElement("div");
    container_card.className = "container-card";
    container_card.appendChild(card_elements);
    return container_card;
  }

  style() {
    const estilo = document.createElement("style");
    estilo.textContent = `

    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    background-color: #1d1d1d;
  }
  
  .container-card {
    margin-top: 30px;
    max-width: 250px;
    background: white;
    border-radius: 10px;
    font-size: 0.8rem;
  }
  
  .card-elements {
    max-width: 250px;
    display: flex;
    gap: 5px;
    justify-content: space-evenly;
    padding: 10px;
  }
  
  .card-elements__info {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    flex-direction: column;
    padding: 5px;
  }

  #deletar > button {
    padding: 2px 5px;
    font-weight: bolder;
    background-color: lightsalmon;
    border: none;
    border-radius: 5px;
}

#deletar > button:hover {
  
  background-color: gray;
  color: white;
  
}
  
  img {
    display: block;
  
    max-width: 80px;
    min-width:80px;
  
    border-radius: 10px;
  }
  

  


  `;

    return estilo;
  }
}

customElements.define("card-endereco", CardComponent);
