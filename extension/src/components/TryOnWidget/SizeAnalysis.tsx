import { useEffect, useState } from "react";
import { requestSizeAnalysis } from "@/api/size";
import { useRecoilValue } from "recoil";
import { currentModelState } from "@/recoil/atoms";

const SizeAnalysis = () => {
  const [sizeChartHTML, setSizeChartHTML] = useState<string | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const currentModel = useRecoilValue(currentModelState);

  useEffect(() => {
    const handleSizeChart = async (event: CustomEvent) => {
      const html = event.detail.sizeChart;
      setSizeChartHTML(html);
      setIsLoading(true);

      try {
        // API 호출 및 SSE 연결
        const eventSource = await requestSizeAnalysis(
          html,
          import.meta.env.VITE_DEVICE_ID, // 실제 deviceId로 교체 필요
          currentModel.id // 실제 modelId로 교체 필요
        );

        eventSource.onmessage = (event) => {
          if (event.data === "[DONE]") {
            eventSource.close();
            setIsLoading(false);
          } else {
            setMessages((prev) => [...prev, event.data]);
          }
        };

        eventSource.onerror = (error) => {
          console.error("SSE Error:", error);
          eventSource.close();
          setIsLoading(false);
        };
      } catch (error) {
        console.error("Size analysis error:", error);
        setIsLoading(false);
      }
    };

    document.addEventListener("size-chart-selected", ((e: Event) =>
      handleSizeChart(e as CustomEvent)) as EventListener);

    return () => {
      document.removeEventListener("size-chart-selected", ((e: Event) =>
        handleSizeChart(e as CustomEvent)) as EventListener);
    };
  }, [currentModel]);

  if (!sizeChartHTML) return null;

  return (
    <div className="size-analysis-container">
      <h3>사이즈 분석</h3>
      {isLoading ? (
        <div>분석 중...</div>
      ) : (
        <div className="messages-container">
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SizeAnalysis;
