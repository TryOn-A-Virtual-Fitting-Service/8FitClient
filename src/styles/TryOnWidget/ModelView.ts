import styled from 'styled-components';

export const ModelViewContainer = styled.div`
  width: 60%;
  margin: 34px auto 10px;
  height: 302px; // aspect-ratio 대신 고정 높이 사용
  flex-shrink: 0;
  position: relative;
  display: flex; // Flexbox 추가
  justify-content: center; // 수평 중앙 정렬
  align-items: flex-end; // 하단 정렬
  z-index: 1;
`;

export const ModelBackground = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 254px;
  height: 302px;
  background-color: #f5f5f5;
  border-radius: 10px;
  z-index: 1;
`;

export const ModelImage = styled.img`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  max-width: 254px;
  height: 334px;
  object-fit: contain;
  z-index: 2; // ModelBackground보다 높게
`;
