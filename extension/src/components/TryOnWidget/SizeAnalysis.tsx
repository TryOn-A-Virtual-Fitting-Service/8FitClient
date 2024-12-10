import { useEffect, useState } from "react";
import { requestSizeAnalysis } from "@/api/size";
import { useRecoilValue } from "recoil";
import { currentModelState } from "@/recoil/atoms";
import { preprocessHtmlString } from "@/utils/htmlProcessor";
import AiIcon from "@/assets/ai";
import {
  SizeAnalysisContainer,
  SizeAnalysisTitle,
  MessageContainer,
  LoadingText,
  StyledAiIcon,
  TitleContainer,
} from "@styles/TryOnWidget/SizeAnalysis";
const SizeAnalysis = () => {
  const [sizeChartHTML, setSizeChartHTML] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const currentModel = useRecoilValue(currentModelState);
  const [displayedText, setDisplayedText] = useState<string>("");

  useEffect(() => {
    if (!analysisResult || isLoading) return;

    const text = analysisResult;
    const totalLength = text.length;
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < totalLength) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [analysisResult, isLoading]);

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
    <SizeAnalysisContainer>
      <TitleContainer>
        <StyledAiIcon>
          <AiIcon />
        </StyledAiIcon>
        <SizeAnalysisTitle>옷 사이즈 AI 분석</SizeAnalysisTitle>
      </TitleContainer>
      {isLoading ? (
        <LoadingText>분석 중...</LoadingText>
      ) : (
        <MessageContainer>{displayedText}</MessageContainer>
      )}
    </SizeAnalysisContainer>
  );
};

export default SizeAnalysis;
