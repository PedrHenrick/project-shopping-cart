// Campo de declaração de variáveis no escopo global
const cart = document.querySelector('.cart__items');
const sectionItem = document.querySelector('.items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  // Remover do carrinho
  cart.removeChild(event.target);
  
  // Remover do LocalStorage
  const element = (event.target.innerText).split(' ')[1];
  localStorage.removeItem(element);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Função que retorna o nome do item pelo sku
function getNameFromProductItem(item) {
  return item.querySelector('span.item__title').innerText;
}

// Função que armazena os itens no carrinho de compras e adiciona em localStorage 
const addToCart = () => {
  sectionItem.addEventListener('click', async (event) => {
    const sku = getSkuFromProductItem(event.target.parentElement);
    const name = getNameFromProductItem(event.target.parentElement);
    const item = await fetchItem(sku);
    const element = createCartItemElement(item);
    cart.appendChild(element);
    saveCartItems(sku, name);
  });
};

// Função que carrega os itens do catálogo
const init = async (conjunto) => {
  const objetos = await fetchProducts(conjunto);
  const result = objetos.results;
  result.forEach(({ id: sku, title: name, thumbnail: image }) => {
    const createElement = createProductItemElement({ sku, name, image });
    sectionItem.appendChild(createElement);
  });
};

// Funcção que pega os itens salvos no carrinho e retorna na página com localStorage
const initialize = () => {
  const cartItems = getSavedCartItems();

  cartItems.forEach(async (sku) => {
    const item = await fetchItem(sku);
    const element = createCartItemElement(item);
    cart.appendChild(element);
  });
};

window.onload = () => {
  initialize(); 
  init('computador'); 
  addToCart(); 
};
