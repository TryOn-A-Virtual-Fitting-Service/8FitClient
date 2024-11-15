import React, { useRef } from 'react';  // useRef 추가
import { useRecoilState } from 'recoil';
import { historyState, currentModelState } from '@/recoil/atoms';
import { requestAddModel } from '@/api/model';  // API 함수 import
import FileUpload from './FileUpload';  // FileUpload 컴포넌트 import
import {
  SelectorContainer,
  SelectorButton,
  DropdownMenu,
  MenuItem,
  ModelSelectorWrapper,
} from '@styles/TryOnWidget';
import { ArrowIcon } from '@components/common/Icons';

const ModelSelector: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [history, setHistory] = useRecoilState(historyState);
  const [, setCurrentModel] = useRecoilState(currentModelState);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addNewModel = async (modelType: string) => {
    try {
      if (modelType === 'custom') {
        fileInputRef.current?.click();
        return;
      }

      // 로컬 이미지 URL 사용
      const imageUrl = modelType === 'male' 
        ? '/images/models/default-male.png'
        : '/images/models/default-female.png';
      
      // 먼저 UI 업데이트
      const newModel = {
        id: Date.now(),
        itemImageUrl: imageUrl,
        modelImageUrl: imageUrl,
      };
      
      setHistory([newModel, ...history]);
      setCurrentModel(newModel);
      setIsOpen(false);

      // 백그라운드에서 서버에 알림
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const modelImage = new File([blob], 'model.png', { type: 'image/png' });

      await requestAddModel(
        import.meta.env.VITE_DEVICE_ID,
        modelImage
      );
    } catch (error) {
      console.error('Failed to add model:', error);
    }
  };

  // 내 사진 업로드 시에는 서버 응답 URL 사용
  const handleFileSelect = async (file: File) => {
    try {
      const response = await requestAddModel(
        import.meta.env.VITE_DEVICE_ID,
        file
      );

      if (response.success) {
        const newModel = {
          id: Date.now(),
          itemImageUrl: response.result.modelUrl,    // 서버 응답 URL 사용
          modelImageUrl: response.result.modelUrl,   // 서버 응답 URL 사용
        };

        setHistory([newModel, ...history]);
        setCurrentModel(newModel);
      }
    } catch (error) {
      console.error('Failed to add custom model:', error);
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
            <MenuItem onClick={() => addNewModel('male')}>남자 모델</MenuItem>
            <MenuItem onClick={() => addNewModel('female')}>여자 모델</MenuItem>
            <MenuItem onClick={() => addNewModel('custom')}>내 사진</MenuItem>
          </DropdownMenu>
        )}
      </SelectorContainer>
    </ModelSelectorWrapper>
  );
};

export default ModelSelector;