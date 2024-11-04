import React from 'react';
import { useRecoilValue } from 'recoil';
import { currentModelState } from '../../recoil/atoms';
import { ModelViewContainer } from './styles';

const ModelView: React.FC = () => {
  const currentModel = useRecoilValue(currentModelState);

  return (
    <ModelViewContainer>
      <img src={currentModel.modelImageUrl} alt="Current model" />
    </ModelViewContainer>
  );
};

export default ModelView;