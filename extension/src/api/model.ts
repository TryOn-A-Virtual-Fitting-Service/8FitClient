import axios from "axios";
import { ApiResponse } from "@/types";

const API_URL = import.meta.env.VITE_API_URL;

interface AddModelResponse {
  modelId: number;
  modelUrl: string;
}

export const requestAddModel = async (
  deviceId: string,
  modelImage: File
): Promise<ApiResponse<AddModelResponse>> => {
  try {
    const formData = new FormData();
    formData.append("image", modelImage); // 키를 'Image'로 설정

    const response = await axios.post<ApiResponse<AddModelResponse>>(
      `${API_URL}/widget/${deviceId}/model`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Add model error:", error);
    throw error;
  }
};
