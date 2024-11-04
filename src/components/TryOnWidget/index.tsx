import React from 'react';
import {
  WidgetContainer,
  Title,
  TryOnButton
} from './styles';
import History from './History';
import ModelView from './ModelView';

const TryOnWidget: React.FC = () => {
  return (
    <WidgetContainer>
      <Title>MUSINSA × 8Fit</Title>
      <div>모델의 옷을 클릭해 직접 입어보세요.</div>
      
      <ModelView />
      <History />
      
      <TryOnButton>
        상의 입어보기
      </TryOnButton>
    </WidgetContainer>
  );
};

export default TryOnWidget;