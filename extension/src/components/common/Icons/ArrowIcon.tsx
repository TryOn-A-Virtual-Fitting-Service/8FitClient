import styled from 'styled-components';

const StyledArrow = styled.svg.attrs({
  viewBox: "0 0 10 6",
  xmlns: "http://www.w3.org/2000/svg",
})`
  display: block;
  width: 8px !important;
  height: 8px !important;
  min-width: 8px;
  min-height: 8px;
`;

export const ArrowIcon: React.FC = () => {
  return (
    <StyledArrow>
      <path 
        d="M1 1l4 4 4-4" 
        stroke="#555555" 
        strokeWidth="1.5" 
        fill="none"
      />
    </StyledArrow>
  );
};

export default ArrowIcon;