const fetchItem = async (Sku) => {
  // seu código aqui
  try {
  const response = await fetch(`https://api.mercadolibre.com/items/${Sku}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
