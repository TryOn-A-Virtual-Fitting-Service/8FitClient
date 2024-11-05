import styled from 'styled-components';

export const ModelViewContainer = styled.div`
  width: 44%;
  margin: 8px auto 10px;
  aspect-ratio: 3/4;
  flex-shrink: 0;  // 크기 고정
  position: relative;
`;

export const ModelBackground = styled.div`
  position: absolute;  // 절대 위치
  bottom: 0;          // 바닥에 맞춤
  left: 50%;          // 가운데 정렬을 위한 설정
  transform: translateX(-50%);  // 정확한 가운데 정렬
  width: 266px;
  height: 302px;
  background-color: #F5F5F5;
  border-radius: 10px;
  z-index: 0;         // 이미지 뒤에 위치
`;

export const ModelImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;  // 배경보다 위에 위치
  z-index: 1;
`;