// Campo de declaração de variáveis no escopo global
const cart = document.querySelector('.cart__items');
const sectionItem = document.querySelector('.items');
const pItem = document.querySelector('.total-price');
const button = document.querySelector('.empty-cart');

// Função que cria a imagem que será usada
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

// Função que cria os elementos que apareceram
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// Função que faz a colocação dos itens 
function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// Função que pega o sku do que será pedido
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// Função que calcula o preço dos ítens no carrinho
const priceNumber = () => {
  const productOfCart = document.querySelectorAll('.cart__item');
  let value = 0;
  productOfCart.forEach((product) => {
    const element = product.innerText.split('$')[1];
    value += parseFloat(element);
  });
  pItem.innerText = value;
};

// Função do evento de click que apaga itens do cart
const cartItemClickListener = async (event) => {
  // Remover do carrinho
  cart.removeChild(event.target);
  // Remover do LocalStorage
  saveCartItems(cart.innerHTML);
  // Atualizando o preço
  priceNumber();
};

// Função que cria itens para serem colocados no cart
function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// evento de click no botão para esvaziar o carrinho. Responsável por apagar tanto no html quanto no localstorage
button.addEventListener('click', () => {
  cart.innerText = '';
  localStorage.clear();
  priceNumber();
});

// Função que armazena os itens no carrinho de compras, soma seus valores e adiciona em localStorage 
sectionItem.addEventListener('click', async (event) => {
  const sku = getSkuFromProductItem(event.target.parentElement);
  const item = await fetchItem(sku);
  const element = createCartItemElement(item);
  cart.appendChild(element);
  console.log(cart);
  saveCartItems(cart.innerHTML);
  priceNumber();
});

// Funcção que pega os itens salvos no carrinho e retorna na página com localStorage
const initialize = () => {
  cart.innerHTML = getSavedCartItems();
  console.log(cart);
  priceNumber();
};

// Função que adiciona carregando na tela
const loading = (type) => {
  if (type === true) {
    const paragraph = document.createElement('p');
    paragraph.className = 'loading';
    paragraph.innerText = 'carregando...';
    document.body.appendChild(paragraph);
  } else {
    const paragraphPic = document.querySelector('.loading');
    document.body.removeChild(paragraphPic);
  }
};

// Função que carrega os itens do catálogo
const init = async (conjunto) => {
  loading(true);
  const objetos = await fetchProducts(conjunto);
  const result = objetos.results;
  result.forEach(({ id: sku, title: name, thumbnail }) => {
    const image = thumbnail.replace('I.jpg', 'W.webp');
    const createElement = createProductItemElement({ sku, name, image });
    sectionItem.appendChild(createElement);
  });
  loading(false);
};

// Função que indica p que aparecerá assim que a página carregar
window.onload = () => {
  init('glock');
  initialize(); 
};

// Referências a code-review: 
//  Mario Junior: https://github.com/tryber/sd-018-b-project-shopping-cart/pull/80
// Paolo Fullone: https://github.com/tryber/sd-018-b-project-shopping-cart/pull/3
// Laecio Silva: https://github.com/tryber/sd-018-b-project-shopping-cart/pull/87
// Leo Oliveira: https://github.com/tryber/sd-018-b-project-shopping-cart/pull/36

// Referências: 
//  Pegar as chaves do localStorage: https://qastack.com.br/programming/8419354/get-html5-localstorage-keys
//  Remover numeros de uma palavra: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/split
//  Remover todos os valores do LocalStorage: https://developer.mozilla.org/pt-BR/docs/Web/API/Storage/clear