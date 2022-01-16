const saveCartItems = (sku, name) => {
  // seu código aqui
  localStorage.setItem(sku, name);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
