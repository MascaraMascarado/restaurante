import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const apiService = {
  // Menu endpoints
  getMenuItems: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/menu`);
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching menu items:', error);
      return [];
    }
  },

  addMenuItem: async (item) => {
    const response = await axios.post(`${API_BASE_URL}/menu`, item);
    return response.data;
  },

  deleteMenuItem: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/menu/${id}`);
    return response.data;
  },

  // Order endpoints
  getOrders: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders`);
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  },

  createOrder: async (orderData) => {
    const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
    return response.data;
  },

  updateOrderStatus: async (orderId, status) => {
    const response = await axios.put(`${API_BASE_URL}/orders/${orderId}`, { status });
    return response.data;
  }
};

export default apiService;
