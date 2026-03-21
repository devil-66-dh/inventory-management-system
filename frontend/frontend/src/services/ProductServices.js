import axios from "axios";

const API_URL = "http://localhost:8080/api/products";

const productService = {
  getProducts: () => axios.get(API_URL),
  addProduct: (data) => axios.post(API_URL, data),
  updateProduct: (id, data) => axios.put(`${API_URL}/${id}`, data),
  deleteProduct: (id) => axios.delete(`${API_URL}/${id}`)
};

export const getProducts = productService.getProducts;
export const addProduct = productService.addProduct;
export const updateProduct = productService.updateProduct;
export const deleteProduct = productService.deleteProduct;

export default productService;