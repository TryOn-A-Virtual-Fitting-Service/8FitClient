import styled from 'styled-components';

export const ModelViewContainer = styled.div`
  width: 60%;
  margin: 34px auto 10px;
  height: 302px;  // aspect-ratio 대신 고정 높이 사용
  flex-shrink: 0;
  position: relative;
  display: flex;  // Flexbox 추가
  justify-content: center;  // 수평 중앙 정렬
  align-items: flex-end;  // 하단 정렬
`;

export const ModelBackground = styled.div`
  position: absolute;
  top: 0;  // bottom 대신 top으로 변경
  left: 50%;
  transform: translateX(-50%);
  width: 254px;
  height: 302px;
  background-color: #F5F5F5;
  border-radius: 10px;
  z-index: 0;
`;

export const ModelImage = styled.img`
  position: absolute;
  bottom: 0;  // 하단에 고정
  left: 50%;
  transform: translateX(-50%);
  width: auto;  // 너비는 자동으로
  height: 334px;  // 고정 높이 설정
  object-fit: contain;
  z-index: 1;
`;