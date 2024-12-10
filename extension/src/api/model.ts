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

export const requestDefaultModel = async (
  deviceId: string,
  gender: "male" | "female"
) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/widget/${deviceId}/default-model/${gender}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to get default model");
    }

    return {
      success: true,
      result: data.result,
    };
  } catch (error) {
    console.error("Default model request failed:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
