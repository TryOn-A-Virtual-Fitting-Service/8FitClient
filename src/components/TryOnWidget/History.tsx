import React from 'react';
import { useRecoilState } from 'recoil';
import { currentModelState, historyState } from '@/recoil/atoms';
import { HistoryContainer, HistoryWrapper, HistoryTitle } from '@styles/TryOnWidget';
import HistoryItem from './HistoryItem';

const History: React.FC = () => {
  const [currentModel, setCurrentModel] = useRecoilState(currentModelState);
  const [history, setHistory] = useRecoilState(historyState);
  
  // 현재 모델 업데이트 함수
  const updateCurrentModel = (newImageUrl: string) => {
    // 현재 모델의 이미지만 업데이트
    const updatedModel = {
      ...currentModel,
      itemImageUrl: newImageUrl
    };
    
    // 현재 모델 상태 업데이트
    setCurrentModel(updatedModel);
    
    // 히스토리에서도 해당 모델 업데이트
    const updatedHistory = history.map(item => 
      item.id === currentModel.id ? updatedModel : item
    );
    setHistory(updatedHistory);
  };

  const emptyBoxes = Array(6).fill(null);
  const latestHistory = history.slice(0,6);
  const items = history.length > 0 
    ? [...latestHistory, ...emptyBoxes].slice(0, 6)
    : emptyBoxes;

  return (
    <HistoryWrapper>
      <HistoryTitle>내 모델</HistoryTitle>
      <HistoryContainer>
        {items.map((item, index) => (
          <HistoryItem
            key={item?.id || index}
            item={item}
            onClick={setCurrentModel}
            isActive={item?.id === currentModel.id}  // 현재 선택된 모델 표시
          />
        ))}
      </HistoryContainer>
    </HistoryWrapper>
  );
};

export default History;