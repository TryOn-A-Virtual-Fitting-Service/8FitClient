import React, { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentModelState, historyState } from '@/recoil/atoms';
import { requestTryOn } from '@/api/tryOn';
import FileUpload from './FileUpload';
import { TryOnButton as StyledButton } from '@styles/TryOnWidget';

const TryOnButtonContainer: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentModel, setCurrentModel] = useRecoilState(currentModelState);
  const [history, setHistory] = useRecoilState(historyState);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (itemImageFile: File) => {
    try {
      if (!currentModel) {
        console.error('No model selected');
        return;
      }

      setIsUploading(true);

      // 현재 모델의 이미지 URL을 File로 변환
      const modelImageResponse = await fetch(currentModel.modelImageUrl);
      if (!modelImageResponse.ok) {
        throw new Error(`Failed to fetch model image: ${modelImageResponse.statusText}`);
      }

      const modelImageBlob = await modelImageResponse.blob();
      const modelImageFile = new File([modelImageBlob], 'model.png', {
        type: 'image/png',
      });

      const response = await requestTryOn(
        import.meta.env.VITE_DEVICE_ID,
        modelImageFile,
        itemImageFile
      );

      if (response.success) {
        const updatedModel = {
          ...currentModel,
          modelImageUrl: response.result.resultImageUrl,
          itemImageUrl: response.result.resultImageUrl
        };

        setCurrentModel(updatedModel);
        
        const updatedHistory = history.map(item => 
          item.id === currentModel.id ? updatedModel : item
        );
        setHistory(updatedHistory);
      } else {
        console.error('Try-on request failed:', response.message);
      }
    } catch (error) {
      console.error('Try-on failed:', error);
    } finally {
      setIsUploading(false);
      // 파일 input 초기화 추가
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <>
      <FileUpload ref={fileInputRef} onFileSelect={handleFileSelect} />
      <StyledButton
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading || !currentModel}
      >
        {isUploading ? '처리중...' : '입어보기'}
      </StyledButton>
    </>
  );
};

export default TryOnButtonContainer;