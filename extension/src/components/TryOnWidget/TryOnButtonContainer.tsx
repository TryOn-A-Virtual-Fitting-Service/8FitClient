import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { currentModelState, historyState } from "@/recoil/atoms";
import { requestTryOn } from "@/api/tryOn";
import FileUpload from "./FileUpload";
import { TryOnButton as StyledButton } from "@styles/TryOnWidget";
import { useBrandConfig } from "@/hooks/useBrandConfig";
interface TryOnButtonContainerProps {
  onStartCapture: () => void; // 추가
}

const TryOnButtonContainer: React.FC<TryOnButtonContainerProps> = ({
  onStartCapture,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentModel, setCurrentModel] = useRecoilState(currentModelState);
  const [history, setHistory] = useRecoilState(historyState);
  const [isUploading, setIsUploading] = useState(false);
  const brandConfig = useBrandConfig();
  const [timer, setTimer] = useState(0);

  useEffect(() => {}, [currentModel]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isUploading) {
      setTimer(30);
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 0.1) {
            clearInterval(interval);
            setIsUploading(false);
            return 30;
          }
          return prev - 0.1; // 0.1초 단위로 감소
        });
      }, 100); // 100ms 간격으로 업데이트
    }
    return () => clearInterval(interval);
  }, [isUploading]);

  useEffect(() => {
    const handleFileSelected = (event: CustomEvent) => {
      const file = event.detail.file;
      handleFileSelect(file);
    };

    document.addEventListener(
      "file-selected",
      handleFileSelected as EventListener
    );

    return () => {
      document.removeEventListener(
        "file-selected",
        handleFileSelected as EventListener
      );
    };
  }, [currentModel]);

  const handleFileSelect = async (itemImageFile: File) => {
    try {
      if (!currentModel) {
        console.error("No model selected");
        return;
      }

      setIsUploading(true);

      const response = await requestTryOn(
        import.meta.env.VITE_DEVICE_ID,
        currentModel.id, // modelId 전달
        itemImageFile
      );

      if (response.success) {
        const updatedModel = {
          ...currentModel,
          modelImageUrl: response.result.resultImageUrl,
          itemImageUrl: response.result.resultImageUrl,
        };

        setCurrentModel(updatedModel);

        const updatedHistory = history.map((item) =>
          item.id === currentModel.id ? updatedModel : item
        );
        setHistory(updatedHistory);
      } else {
        console.error("Try-on request failed:", response.message);
        setTimer(0);
      }
    } catch (error) {
      console.error("Try-on failed:", error);
      setTimer(0);
    } finally {
      setIsUploading(false);
      setTimer(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <>
      <FileUpload ref={fileInputRef} onFileSelect={handleFileSelect} />
      <StyledButton
        $brandColor={brandConfig.primaryColor}
        $progress={30 - timer}
        onClick={onStartCapture}
        disabled={isUploading || !currentModel}
      >
        {isUploading ? "입는 중..." : "입어보기"}
      </StyledButton>
    </>
  );
};

export default TryOnButtonContainer;
