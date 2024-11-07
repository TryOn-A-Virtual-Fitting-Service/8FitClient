import React from 'react';
import { ModelItem } from '@/types/model';  // 경로 수정
import { StyledHistoryImage, EmptyHistoryItem, HistoryItemWrapper } from '@styles/TryOnWidget';

interface HistoryItemProps {
  item?: ModelItem;
  onClick?: (item: ModelItem) => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ item, onClick }) => {
  if (!item) {
    return (
      <HistoryItemWrapper>
        <EmptyHistoryItem />
      </HistoryItemWrapper>
    );
  }

  return (
    <HistoryItemWrapper onClick={() => onClick?.(item)}>
      <StyledHistoryImage
        src={item.itemImageUrl}
      />
    </HistoryItemWrapper>
  );
};

export default HistoryItem;


