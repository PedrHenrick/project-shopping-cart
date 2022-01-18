const fetchProducts = async (conjunto) => {
  // seu código aqui
  try {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${conjunto}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
