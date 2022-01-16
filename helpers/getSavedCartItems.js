const getSavedCartItems = () => {
  // seu código aqui
  const arrKeys = Object.keys(localStorage);
  return arrKeys;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
