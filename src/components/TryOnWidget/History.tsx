import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentModelState, historyState } from '@/recoil/atoms';
import {
  HistoryContainer,
  HistoryWrapper,
  HistoryTitle,
} from '@styles/TryOnWidget';
import HistoryItem from './HistoryItem';

const History: React.FC = () => {
  const [currentModel, setCurrentModel] = useRecoilState(currentModelState);
  const history = useRecoilValue(historyState);

  const emptyBoxes = Array(6).fill(null);
  const latestHistory = history.slice(0, 6);
  const items =
    history.length > 0
      ? [...latestHistory, ...emptyBoxes].slice(0, 6)
      : emptyBoxes;

  return (
    <HistoryWrapper>
      <HistoryTitle>내 모델</HistoryTitle>
      <HistoryContainer>
        {items.map((item, index) => (
          <HistoryItem
            key={`history-item-${index}`}
            item={item}
            onClick={setCurrentModel}
            isActive={item?.id === currentModel.id} // 현재 선택된 모델 표시
          />
        ))}
      </HistoryContainer>
    </HistoryWrapper>
  );
};

export default History;
