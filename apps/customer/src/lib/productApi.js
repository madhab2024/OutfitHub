import axios from 'axios'

export const fetchProducts = async () => {
  const { data } = await axios.get('/mock/products.json')
  return data.products || []
}
