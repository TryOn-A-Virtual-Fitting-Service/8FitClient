import styled from "styled-components";

export const WidgetContainer = styled.div`
  position: relative;
  box-sizing: border-box; // padding과 border를 width에 포함
  width: 300px; // 100% 대신 고정 너비 사용
  height: 594px; // 100% 대신 고정 높이 사용
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 0px;
  color: #000;
  background-color: white;
  border-radius: 12px;
  border: 1px solid #e5e5e5;
  z-index: 0; // 기본 z-index
`;

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: #000;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 4px; // 이미지와 텍스트 사이 간격
`;

export const BrandImage = styled.img`
  height: 14px; // 텍스트 크기와 동일하게
  width: auto; // 비율 유지
  object-fit: contain;
`;

export const Rectangle = styled.div`
  width: 14px;
  height: 14px;
  min-height: 14px; // 최소 높이 지정
  background-color: #000;
  margin-bottom: 8px;
  flex-shrink: 0; // flex 컨테이너 안에서 크기 축소 방지
`;

export const Description = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #555555;
  margin-top: 4px; // Title과의 간격
`;

export const TryOnButton = styled.button`
  width: 100%;
  padding: 10px; // 패딩 줄임
  background-color: #000;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: #222;
  }
  outline: none;
  &:focus {
    outline: none; // focus 상태에서도 테두리 제거
  }
`;

export * from "./ModelView";
export * from "./History";
export * from "./HistoryItem";
export * from "./ModelSelecter";
