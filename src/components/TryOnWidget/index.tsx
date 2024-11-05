import React from 'react';
import {
  WidgetContainer,
  Rectangle,
  Title,
  BrandImage,
  Description,
  TryOnButton
} from '@styles/TryOnWidget';
import History from './History';
import ModelView from './ModelView';

const TryOnWidget: React.FC = () => {
  return (
    <WidgetContainer>
      <Rectangle />
      <Title>
        <BrandImage 
          src="/images/brands/musinsa.png" 
        />
        × 8Fit
      </Title>
      <Description>온라인에서도 옷을 직접 입어보세요</Description>
      
      <ModelView />
      <History />
      
      <TryOnButton>
        상의 입어보기
      </TryOnButton>
    </WidgetContainer>
  );
};

export default TryOnWidget;