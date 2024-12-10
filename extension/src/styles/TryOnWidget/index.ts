import styled from "styled-components";

export const WidgetContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 300px;
  height: 594px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 0px;
  color: #000;
  background-color: white;
  border-radius: 12px;
  border: 1px solid #e5e5e5;
  z-index: 0;
`;

export const WidgetWrapper = styled.div`
  position: fixed;
  left: 50%;
  top: -840px;
  transform: translate(-4px);
  z-index: 9997;
  font-family: "Pretendard Variable", -apple-system, BlinkMacSystemFont,
    system-ui, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  margin-bottom: 190px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Title = styled.h1<{ $brandColor: string }>`
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => props.$brandColor};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const BrandImage = styled.img`
  height: 14px; // 텍스트 크기와 동일하게
  width: auto; // 비율 유지
  object-fit: contain;
`;

export const Rectangle = styled.div<{ $brandColor: string }>`
  width: 14px;
  height: 14px;
  min-height: 14px;
  background-color: ${(props) => props.$brandColor};
  margin-bottom: 8px;
  flex-shrink: 0;
`;

export const Description = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #555555;
  margin-top: 4px; // Title과의 간격
`;

export const TryOnButton = styled.button<{
  $brandColor: string;
  $progress: number;
}>`
  width: 100%;
  padding: 10px;
  background: linear-gradient(
    to right,
    ${(props) => props.$brandColor} ${(props) => (props.$progress / 40) * 100}%,
    white ${(props) => (props.$progress / 40) * 100}%
  );
  color: ${(props) => (props.$progress > 20 ? "white" : "black")};
  border: 2px solid ${(props) => props.$brandColor};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  outline: none;
  &:focus {
    outline: none;
  }
`;

export * from "./ModelView";
export * from "./History";
export * from "./HistoryItem";
export * from "./ModelSelecter";
export * from "./SizeAnalysis";
