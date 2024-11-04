import React from 'react';
import { useRecoilState } from 'recoil';
import { currentModelState, historyState } from '../../recoil/atoms';
import { HistoryContainer } from './styles';
import HistoryItem from './HistoryItem';

const History: React.FC = () => {
  const [, setCurrentModel] = useRecoilState(currentModelState);
  const [history] = useRecoilState(historyState);
  
  const emptyBoxes = Array(6).fill(null);
  const items = history.length > 0 ? history : emptyBoxes;

  return (
    <HistoryContainer>
      {items.map((item, index) => (
        <HistoryItem
          key={item?.id || index}
          item={item}
          onClick={setCurrentModel}
        />
      ))}
    </HistoryContainer>
  );
};

export default History;