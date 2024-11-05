import React from 'react';
import { useRecoilValue } from 'recoil';
import { currentModelState } from '@/recoil/atoms';
import { ModelViewContainer, ModelBackground, ModelImage } from '@styles/TryOnWidget';

const ModelView: React.FC = () => {
  const currentModel = useRecoilValue(currentModelState);

  return (
    <ModelViewContainer>
    <ModelBackground />
    <ModelImage src={currentModel?.modelImageUrl} alt="model" />
    </ModelViewContainer>
  );
};

export default ModelView;