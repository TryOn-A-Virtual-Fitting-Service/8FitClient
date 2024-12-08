import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { currentModelState, historyState } from "@/recoil/atoms";
import { requestTryOn } from "@/api/tryOn";
import FileUpload from "./FileUpload";
import { TryOnButton as StyledButton } from "@styles/TryOnWidget";

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

  useEffect(() => {
    console.log("TryOnButtonContainer - Current Model:", currentModel);
  }, [currentModel]);

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

      console.log("Current Model before request:", currentModel); // 추가
      console.log("Current Model ID:", currentModel.id);

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
      }
    } catch (error) {
      console.error("Try-on failed:", error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <>
      <FileUpload ref={fileInputRef} onFileSelect={handleFileSelect} />
      <StyledButton
        onClick={onStartCapture}
        disabled={isUploading || !currentModel}
      >
        {isUploading ? "처리중..." : "입어보기"}
      </StyledButton>
    </>
  );
};

export default TryOnButtonContainer;
