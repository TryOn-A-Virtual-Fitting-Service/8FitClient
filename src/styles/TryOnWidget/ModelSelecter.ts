import styled from 'styled-components';

export const SelectorContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const SelectorButton = styled.button`
  width: 72px;
  height: 28px;
  background: #dddddd;
  color: #555555;
  font-weight: 700;
  padding: 4px 6px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  font-size: 12px;
  outline: none; // 포커스 아웃라인 제거
  border: none;

  & svg {
    transform: rotate(0deg);
    transition: transform 0s ease;
  }

  &:hover svg {
    transform: rotate(180deg);
  }

  &:focus {
    outline: none; // 포커스 시 아웃라인 제거
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%; // SelectorButton 바로 아래에 위치
  left: 0;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 6px 0;
  z-index: 1; // 다른 요소들 위에 표시
  width: 72px;
  box-shadow: 0px 0px 6px -2px rgba(0, 0, 0, 0.16);
`;

export const MenuItem = styled.button`
  width: 100%;
  height: 32px;
  font-size: 12px;
  padding: 0;
  display: flex; // flexbox 사용
  justify-content: center; // 수평 중앙 정렬 추가
  align-items: center; // 수직 중앙 정렬
  text-align: center;
  line-height: 22px;
  border: none;
  background: none;
  color: #666666;
  cursor: pointer;
  border-radius: 0;
  outline: none; // 포커스 아웃라인 제거
  &:hover {
    background: #f5f5f5;
  }
  &:focus {
    outline: none; // 포커스 시 아웃라인 제거
    background: #f5f5f5; // 대신 hover와 같은 배경색 적용
  }
`;

export const ModelSelectorWrapper = styled.div`
  position: absolute;
  top: 14px;
  left: 12px;
  z-index: 2;
`;
