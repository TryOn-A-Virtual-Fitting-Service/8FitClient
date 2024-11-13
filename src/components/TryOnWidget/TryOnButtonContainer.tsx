import React, { useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedModelState, currentModelState, historyState } from '@/recoil/atoms';
import { requestTryOn } from '@/api/tryOn';
import FileUpload from './FileUpload';
import { TryOnButton as StyledButton } from '@styles/TryOnWidget';

const TryOnButtonContainer: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedModel = useRecoilValue(selectedModelState);
  const setCurrentModel = useSetRecoilState(currentModelState);
  const setHistory = useSetRecoilState(historyState);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (itemImageFile: File) => {
    try {
      setIsUploading(true);

      // 선택된 모델에 따라 기본 이미지 파일 생성
      const modelImageResponse = await fetch(
        selectedModel === 'male'
          ? '/images/models/default-male.png'
          : '/images/models/default-female.png'
      );
      const modelImageBlob = await modelImageResponse.blob();
      const modelImageFile = new File([modelImageBlob], 'model.png', {
        type: 'image/png',
      });

      const response = await requestTryOn(
        import.meta.env.VITE_DEVICE_ID,
        modelImageFile,
        itemImageFile
      );

      // 결과 이미지로 현재 모델과 히스토리 업데이트
      if (response.success) {
        const newModel = {
          id: Date.now(), // 임시 ID로 타임스탬프 사용
          itemImageUrl: URL.createObjectURL(itemImageFile), // 로컬 URL 생성
          modelImageUrl: response.result.resultImageUrl,
        };

        setCurrentModel(newModel);
        setHistory(prev => [newModel, ...prev]); // 히스토리 맨 앞에 추가
      } else {
        console.error('Try-on request failed:', response.message);
      }
    } catch (error) {
      console.error('Try-on failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <FileUpload ref={fileInputRef} onFileSelect={handleFileSelect} />
      <StyledButton
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
      >
        {isUploading ? '처리중...' : '상의 입어보기'}
      </StyledButton>
    </>
  );
};

export default TryOnButtonContainer;