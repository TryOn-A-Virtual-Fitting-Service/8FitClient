import { useEffect, useState } from "react";
import { requestSizeAnalysis } from "@/api/size";
import { useRecoilValue } from "recoil";
import { currentModelState } from "@/recoil/atoms";
import { preprocessHtmlString } from "@/utils/htmlProcessor";

const SizeAnalysis = () => {
  const [sizeChartHTML, setSizeChartHTML] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const currentModel = useRecoilValue(currentModelState);

  useEffect(() => {
    const handleSizeChart = async (event: CustomEvent) => {
      const rawHtml = event.detail.sizeChart;
      const processedHtml = preprocessHtmlString(rawHtml);
      setSizeChartHTML(processedHtml);
      setIsLoading(true);

      try {
        const response = await requestSizeAnalysis(
          processedHtml,
          import.meta.env.VITE_DEVICE_ID,
          currentModel.id
        );

        if (response.success) {
          setAnalysisResult(response.result.sizeChat);
        } else {
          console.error("Size analysis failed:", response.message);
        }
      } catch (error) {
        console.error("Size analysis error:", error);
      } finally {
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
        <div className="message-container">
          <p>{analysisResult}</p>
        </div>
      )}
    </div>
  );
};

export default SizeAnalysis;
