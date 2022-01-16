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
  const price = (event.target.innerText).split(' ');
  let valueOfItem = 0;
  price.forEach((valor) => {
    if (valor[0] === '$') {
      const value = valor.replace(/[^0-9]/g, '');
      valueOfItem += value - (value * 2);
    }
  });
  
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

// Função que armazena os itens no carrinho de compras, soma seus valores e adiciona em localStorage 
const addToCart = () => {
  sectionItem.addEventListener('click', async (event) => {
    const sku = getSkuFromProductItem(event.target.parentElement);
    const name = getNameFromProductItem(event.target.parentElement);
    const item = await fetchItem(sku);
    const element = createCartItemElement(item);
    cart.appendChild(element);
    saveCartItems(sku, name, item.price);
    cart.firstChild.lastChild.innerText = localStorage.getItem('price');
  });
};

// Função que carrega os itens do catálogo
const init = async (conjunto) => {
  // localStorage.setItem('price', 0);
  const objetos = await fetchProducts(conjunto);
  const result = objetos.results;
  result.forEach(({ id: sku, title: name, thumbnail: image }) => {
    const createElement = createProductItemElement({ sku, name, image });
    sectionItem.appendChild(createElement);
  });
  const ol = document.createElement('ol');
  ol.className = 'total-price';
  ol.innerText = 'SubTotal';
  cart.appendChild(ol);

  const li = document.createElement('li');
  li.className = 'total-value';
  li.innerText = localStorage.getItem('price');
  ol.appendChild(li);
};

// Funcção que pega os itens salvos no carrinho e retorna na página com localStorage
const initialize = () => {  
  const cartItems = getSavedCartItems();
    cartItems.forEach(async (sku) => {
      if (sku !== 'price') {
        const item = await fetchItem(sku);
        const element = createCartItemElement(item);
        cart.appendChild(element);
      }
    });
};

window.onload = () => {
  initialize(); 
  init('computador');
  addToCart(); 
};

// Referências: 
//  Pegar as chaves do localStorage: https://qastack.com.br/programming/8419354/get-html5-localstorage-keys
//  Remover numeros de uma palavra: https://www.horadecodar.com.br/2020/10/14/como-obter-apenas-os-numeros-de-uma-string-em-javascript/