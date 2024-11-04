import axios from 'axios';

const API_BASE_URL = 'your-api-endpoint';

export const tryOnService = {
  async tryOnClothing(modelImage: string, clothingImage: string) {
    try {
      const response = await axios.post(`${API_BASE_URL}/try-on`, {
        modelImage,
        clothingImage
      });
      return response.data;
    } catch (error) {
      console.error('Failed to process try-on:', error);
      throw error;
    }
  },
  
  async getHistory() {
    try {
      const response = await axios.get(`${API_BASE_URL}/history`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch history:', error);
      throw error;
    }
  }
};