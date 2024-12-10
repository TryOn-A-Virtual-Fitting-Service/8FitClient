import styled, { keyframes } from "styled-components";

const gradientAnimation = keyframes`
  0% {
    color: #0051BC;
  }
  50% {
    color: #2B7FFF;
  }
  100% {
    color: #0051BC;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0px;
  flex-direction: row;
`;

export const StyledAiIcon = styled.div`
  display: flex;
  align-items: center;
  svg {
    path {
      animation: ${gradientAnimation} 2s ease-in-out infinite;
      fill: currentColor;
    }
  }
`;

export const SizeAnalysisContainer = styled.div`
  width: 300px; // 위젯과 동일한 너비
  padding: 16px;
  background-color: white;
  border-radius: 12px;
  border: 1px solid #e5e5e5;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 300px; // 최대 높이 설정
  overflow-y: auto; // 내용이 많으면 스크롤
`;

export const SizeAnalysisTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  animation: ${gradientAnimation} 1.5s ease-in-out infinite;
`;

export const MessageContainer = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #24292f;
  line-height: 1.5;
  white-space: pre-wrap;
`;

export const LoadingText = styled.div`
  font-size: 14px;
  color: #24292f;
  text-align: center;
  padding: 8px 0;
`;
