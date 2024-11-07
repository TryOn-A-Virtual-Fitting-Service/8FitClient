import axios from 'axios';
import { ApiResponse } from '@/types';

interface TryOnResponse {
  resultImageUrl: string;
}

export const requestTryOn = async (
  deviceId: string,
  modelImage: File,
  itemImage: File
): Promise<ApiResponse<TryOnResponse>> => {
  const formData = new FormData();
  formData.append('modelImage', modelImage);
  formData.append('itemImage', itemImage);

  try {
    const response = await axios.post<ApiResponse<TryOnResponse>>(
      `/api/widget/${deviceId}/cloth`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('TryOn request error:', error);
    throw error;
  }
};
