const fetchItem = async (id) => {
  // seu código aqui
  const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const data = await response.json();
  return data;
};

console.log(fetchItem());

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
