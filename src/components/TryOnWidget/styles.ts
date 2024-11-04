import styled from 'styled-components';

export const WidgetContainer = styled.div`
  box-sizing: border-box;  // padding과 border를 width에 포함
  width: 300px;           // 100% 대신 고정 너비 사용
  height: 584px;          // 100% 대신 고정 높이 사용
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: #000;
  background-color: white;
  border-radius: 12px;
  border: 1px solid #E5E5E5;
`;

export const Title = styled.h1`
  font-size: 16px;  // 더 작게
  font-weight: 500;
  color: #000;
  margin: 0;  // 마진 제거
`;

export const ModelViewContainer = styled.div`
  width: 44%;
  margin: 8px auto;  // 상하 여백 추가
  aspect-ratio: 3/4;
  flex-shrink: 0;  // 크기 고정
`;

export const HistoryItem = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 0;
  border: 1px solid #eee;
`;

export const TryOnButton = styled.button`
  width: 100%;
  padding: 12px;  // 패딩 줄임
  background-color: #000;
  color: white;
  border: none;
  border-radius: 0;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-top: auto;  // 하단에 고정

  &:hover {
    background-color: #222;
  }
`;

export const EmptyHistoryItem = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border: 1px solid #eee;
  background-color: #fafafa;
`;

export const HistoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 4px;  // gap 줄임
  width: 100%;
  padding: 4px 0;  // 패딩 줄임
  flex-shrink: 0;  // 크기 고정
`;