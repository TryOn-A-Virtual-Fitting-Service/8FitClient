import React, { useRef } from "react"; // useRef 추가
import { useRecoilState } from "recoil";
import { historyState, currentModelState } from "@/recoil/atoms";
import { requestAddModel, requestDefaultModel } from "@/api/model"; // API 함수 import
import FileUpload from "./FileUpload"; // FileUpload 컴포넌트 import
import {
  SelectorContainer,
  SelectorButton,
  DropdownMenu,
  MenuItem,
  ModelSelectorWrapper,
} from "@styles/TryOnWidget";
import { ArrowIcon } from "@components/common/Icons";
import { ModelItem } from "@/types/model";

const ModelSelector: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [history, setHistory] = useRecoilState(historyState);
  const [, setCurrentModel] = useRecoilState(currentModelState);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addNewModel = async (modelType: string) => {
    try {
      if (modelType === "custom") {
        fileInputRef.current?.click();
        return;
      }

      // 기본 모델 API 호출
      const response = await requestDefaultModel(
        import.meta.env.VITE_DEVICE_ID,
        modelType as "male" | "female"
      );

      console.log("API 응답 전체:", response);
      console.log("response.result:", response.result);
      console.log("modelId:", response.result.modelId);
      console.log("modelUrl:", response.result.modelUrl);

      if (response.success) {
        const newModel: ModelItem = {
          id: response.result.modelId,
          modelImageUrl: response.result.modelUrl,
          fittings: [],
        };
        console.log("생성된 newModel:", newModel);

        setHistory([newModel, ...history]);
        setCurrentModel(newModel);
      } else {
        console.error("Failed to add default model:", response.message);
      }
    } catch (error) {
      console.error("Failed to add model:", error);
    }
    setIsOpen(false);
  };

  // 내 사진 업로드 시에는 서버 응답 URL 사용
  const handleFileSelect = async (file: File) => {
    try {
      const response = await requestAddModel(
        import.meta.env.VITE_DEVICE_ID,
        file
      );

      if (response.success) {
        const newModel: ModelItem = {
          id: response.result.modelId,
          modelImageUrl: response.result.modelUrl,
          fittings: [], // 새 모델이니 빈 배열로 초기화
        };

        setHistory([newModel, ...history]);
        setCurrentModel(newModel);
      }
    } catch (error) {
      console.error("Failed to add custom model:", error);
    }
    setIsOpen(false);
  };

  return (
    <ModelSelectorWrapper>
      <FileUpload ref={fileInputRef} onFileSelect={handleFileSelect} />
      <SelectorContainer
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <SelectorButton>
          새 모델 <ArrowIcon />
        </SelectorButton>

        {isOpen && (
          <DropdownMenu>
            <MenuItem onClick={() => addNewModel("male")}>남자 모델</MenuItem>
            <MenuItem onClick={() => addNewModel("female")}>여자 모델</MenuItem>
            <MenuItem onClick={() => addNewModel("custom")}>내 사진</MenuItem>
          </DropdownMenu>
        )}
      </SelectorContainer>
    </ModelSelectorWrapper>
  );
};

export default ModelSelector;
