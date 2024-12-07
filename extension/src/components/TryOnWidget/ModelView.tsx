import React from "react";
import { useRecoilValue } from "recoil";
import { currentModelState } from "@/recoil/atoms";
import {
  ModelViewContainer,
  ModelBackground,
  ModelImage,
} from "@styles/TryOnWidget";
import ModelSelector from "./ModelSelector";

const ModelView: React.FC = () => {
  const currentModel = useRecoilValue(currentModelState);

  return (
    <ModelViewContainer>
      <ModelBackground />
      <ModelSelector />
      {currentModel?.modelImageUrl ? (
        <ModelImage src={currentModel.modelImageUrl} alt="model" />
      ) : null}
    </ModelViewContainer>
  );
};

export default ModelView;
