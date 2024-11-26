import styled from 'styled-components';

export const HistoryItemWrapper = styled.div`
  position: relative;
  width: 34px;
  height: 34px;
  cursor: pointer;
  background-color: #fff;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    opacity: 0;
    border: 1px solid rgba(0, 0, 0, 0);
    transition: opacity 0.1s;
    z-index: 1;
  }

  &:hover::before {
    opacity: 1;
  }
`;

export const StyledHistoryImage = styled.img<{ $isActive?: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  border: ${(props) =>
    props.$isActive ? '1px solid #555' : '1px solid #eee;'};
`;

export const EmptyHistoryItem = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border: 1px solid #eee;
  background-color: #fafafa;
  border-radius: 4px;
`;
