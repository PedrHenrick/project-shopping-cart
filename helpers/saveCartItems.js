const saveCartItems = (sku, name, price) => {
  // seu código aqui
  localStorage.setItem(sku, name);
  
  let priceTotal = parseFloat(localStorage.getItem('price'));
  if (!priceTotal) {
    priceTotal = localStorage.setItem('price', price);
  } else {
    const total = parseFloat(price) + parseFloat(priceTotal);
    localStorage.setItem('price', total);
  }
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
