class FormComponent extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    shadow.appendChild(this.load());
    shadow.appendChild(this.style());
  }

  load() {
    const form = document.createElement("form");

    const container_search = document.createElement("div");
    container_search.className = "container-search";

    const wrap_container_search = document.createElement("div");
    wrap_container_search.classList.add("wrap-container-search");

    const h2 = document.createElement("h2");
    container_search.appendChild(h2);

    const input = document.createElement("input");
    const button = document.createElement("button");
    button.classList.add("search-btn");
    button.setAttribute("id", "buttonId");
    button.textContent = "Buscar";

    input.classList.add("search");
    input.setAttribute("id", "searchId");
    input.placeholder = this.getAttribute("placeholder") || "";

    wrap_container_search.appendChild(input);
    wrap_container_search.appendChild(button);

    h2.innerText = this.getAttribute("titulo") || "Busca";
    h2.classList.add("search-title");

    container_search.appendChild(wrap_container_search);
    form.appendChild(container_search);

    return form;
  }

  style() {
    const estilo = document.createElement("style");
    estilo.textContent = `
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #1d1d1d;
  }
  
  .container-search {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  
    padding: 10px;
  }
  
  form {
    max-width: 960px;
    margin: 0 auto;
  }
  
  .search-title {
    color: white;
  }
  
  .wrap-container-search {
    margin: 0 auto;
    border-radius: 50px;
    width: 300px;
    background-color: rgb(0, 0, 0);
    padding: 4px;
    display: flex;
    justify-content: center
    flex-direction: row;
  }
  
  .search {
    flex-grow: 2;
  }
  
  .search-btn {
    padding: 5px;
    border-radius: 10px;
    background-color: #ffd669;
    border: none;
    cursor: pointer;
  }
  
  .search-btn:hover {
    background-color: rgb(247, 90, 0);
    color: rgb(238, 238, 238);
  }
  
  .search {
    background: none;
    outline: none;
    color: white;
    text-align: center;
    border: none;
  }
  

    `;

    return estilo;
  }
}

customElements.define("card-form", FormComponent);
