import styled from "styled-components";

export const SizeAnalysisContainer = styled.div`
  width: 300px; // 위젯과 동일한 너비
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 300px; // 최대 높이 설정
  overflow-y: auto; // 내용이 많으면 스크롤
`;

export const SizeAnalysisTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: #000;
  margin: 0;
`;

export const MessageContainer = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #555555;
  line-height: 1.5;
  white-space: pre-wrap;
`;

export const LoadingText = styled.div`
  font-size: 12px;
  color: #666666;
  text-align: center;
  padding: 8px 0;
`;
