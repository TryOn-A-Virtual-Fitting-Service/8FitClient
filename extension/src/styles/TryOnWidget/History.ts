import styled from 'styled-components';

export const HistoryContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;  // 아이템들 사이 균등 간격
  align-items: center;            // 세로 중앙 정렬
  width: 100%;
  height: 58px;
  background-color: #F5F5F5;
  border-radius: 8px;
  padding: 0 10px;
  flex-shrink: 0;
`;

export const HistoryWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 14px;  // 하단 margin 16px
  gap: 4px;
`;

export const HistoryTitle = styled.div`
  text-align: left;
  font-size: 12px;
  font-weight: 400;
  color: #555555;
`;