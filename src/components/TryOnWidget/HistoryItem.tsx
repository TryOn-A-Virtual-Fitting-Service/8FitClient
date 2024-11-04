import React from 'react';
import { ModelItem } from '../../types/model';  // 경로 수정
import { HistoryItem as StyledHistoryItem, EmptyHistoryItem } from './styles';

interface HistoryItemProps {
  item?: ModelItem;
  onClick?: (item: ModelItem) => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ item, onClick }) => {
  if (!item) {
    return <EmptyHistoryItem />;
  }

  return (
    <StyledHistoryItem
      src={item.imageUrl} // 이미 imageUrl 사용 중이므로 수정 불필요
      alt={item.name}
      onClick={() => onClick?.(item)}
    />
  );
};

export default HistoryItem;
