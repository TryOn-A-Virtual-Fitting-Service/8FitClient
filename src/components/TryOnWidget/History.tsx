import React from 'react';
import { useRecoilState } from 'recoil';
import { currentModelState, historyState } from '@/recoil/atoms';
import { HistoryContainer, HistoryWrapper, HistoryTitle } from '@styles/TryOnWidget';
import HistoryItem from './HistoryItem';

const History: React.FC = () => {
  const [, setCurrentModel] = useRecoilState(currentModelState);
  const [history] = useRecoilState(historyState);
  
  const emptyBoxes = Array(6).fill(null);
  const latestHistory = history.slice(0,6);  // 뒤에서부터 6개
  const items = history.length > 0 
    ? [...latestHistory, ...emptyBoxes].slice(0, 6)  // 6개로 제한
    : emptyBoxes;

  return (
    <HistoryWrapper>
      <HistoryTitle>히스토리</HistoryTitle>
      <HistoryContainer>
        {items.map((item, index) => (
          <HistoryItem
            key={item?.id || index}
            item={item}
            onClick={setCurrentModel}
          />
        ))}
      </HistoryContainer>
    </HistoryWrapper>
  );
};

export default History;