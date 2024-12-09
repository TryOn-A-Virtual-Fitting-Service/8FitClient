import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const requestSizeAnalysis = async (
  content: string,
  deviceId: string,
  modelId: number
): Promise<EventSource> => {
  // 초기 POST 요청
  await axios.post(`${API_URL}/api/v1/chat/size`, {
    content,
    deviceId,
    modelId,
  });

  // SSE 연결 설정
  const eventSource = new EventSource(`${API_URL}/api/v1/chat/size`);
  return eventSource;
};
