const API_BASE_URL = 'https://api-inventory.isavralabel.com/home-vapor/api';

export const api = {
  // Categories
  getCategories: () => fetch(`${API_BASE_URL}/categories`).then(res => res.json()),
  createCategory: (data) => fetch(`${API_BASE_URL}/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  updateCategory: (id, data) => fetch(`${API_BASE_URL}/categories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  deleteCategory: (id) => fetch(`${API_BASE_URL}/categories/${id}`, {
    method: 'DELETE'
  }).then(res => res.json()),

  // Products
  getProducts: (page = 1, limit = 6, category = '') => {
    const params = new URLSearchParams({ page, limit });
    if (category) params.append('category', category);
    return fetch(`${API_BASE_URL}/products?${params}`).then(res => res.json());
  },
  getProduct: (id) => fetch(`${API_BASE_URL}/products/${id}`).then(res => res.json()),
  createProduct: (formData) => fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    body: formData
  }).then(res => res.json()),
  updateProduct: (id, formData) => fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'PUT',
    body: formData
  }).then(res => res.json()),
  deleteProduct: (id) => fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE'
  }).then(res => res.json()),

  // Dashboard stats
  getDashboardStats: () => fetch(`${API_BASE_URL}/dashboard/stats`).then(res => res.json())
};

export default api;