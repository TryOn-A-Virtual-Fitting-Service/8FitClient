import axios from 'axios';
import { ApiResponse, WidgetData } from '@/types';

// const API_URL = import.meta.env.VITE_API_URL;  // 환경변수는 제거

export const fetchHistory = async (
  deviceId: string = import.meta.env.VITE_DEVICE_ID
): Promise<ApiResponse<WidgetData>> => {
  try {
    // ${API_URL} 대신 proxy 경로인 /api 사용
    const response = await axios.get<ApiResponse<WidgetData>>(
      `api/widget/${deviceId}`
    );
    return response.data;
  } catch (error) {
    console.error('History fetch error:', error);
    throw error;
  }
};
