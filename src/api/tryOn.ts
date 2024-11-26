import axios from 'axios';
import { ApiResponse } from '@/types';

// api/tryOn.ts
interface TryOnResponse {
  resultImageUrl: string;
}

export const requestTryOn = async (
  deviceId: string,
  modelId: number,
  itemImage: File
): Promise<ApiResponse<TryOnResponse>> => {
  const formData = new FormData();
  formData.append('itemImage', itemImage);

  try {
    const response = await axios.post<ApiResponse<TryOnResponse>>(
      `/api/widget/${deviceId}/cloth/${modelId}`,
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
