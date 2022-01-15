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
  let soPraTirarOErro;
  soPraTirarOErro.push(event);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const init = async (conjunto) => {
  const sectionItem = document.querySelector('.items');
  const objetos = await fetchProducts(conjunto);
  const result = objetos.results;
  result.forEach(({ id: sku, title: name, thumbnail: image }) => {
    const createElement = createProductItemElement({ sku, name, image });
    sectionItem.appendChild(createElement);
  });
  sectionItem.addEventListener('click', async (event) => {
    const cart = document.querySelector('.cart__items');
    const sku = getSkuFromProductItem(event.target.parentElement);
    const item = await fetchItem(sku);
    const element = createCartItemElement(item);
    console.log(element);
    cart.appendChild(element);
  });
};

window.onload = () => { init('computador'); };
