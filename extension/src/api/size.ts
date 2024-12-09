import axios from "axios";
import { ApiResponse } from "@/types";

const API_URL = import.meta.env.VITE_API_URL;

interface SizeAnalysisResult {
  sizeChat: string;
}

export const requestSizeAnalysis = async (
  content: string,
  deviceId: string = import.meta.env.VITE_DEVICE_ID,
  modelId: number
): Promise<ApiResponse<SizeAnalysisResult>> => {
  try {
    const response = await axios.post<ApiResponse<SizeAnalysisResult>>(
      `${API_URL}/chat/size`,
      {
        content,
        deviceId,
        modelId,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Size analysis error:", error);
    throw error;
  }
};

export type { SizeAnalysisResult };
