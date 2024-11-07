import React from 'react';
import { useRecoilState } from 'recoil';
import {
  modelListState,
  selectedModelState,
  isSelectorOpenState,
} from '@/recoil/atoms';
import {
  SelectorContainer,
  SelectorButton,
  DropdownMenu,
  MenuItem,
  ModelSelectorWrapper,
} from '@styles/TryOnWidget';
import { ArrowIcon } from '@components/common/Icons';

const ModelSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useRecoilState(isSelectorOpenState);
  const [modelList, setModelList] = useRecoilState(modelListState);
  const [selectedModel, setSelectedModel] = useRecoilState(selectedModelState);

  const addCustomModel = () => {
    const customCount = modelList.filter((m) => m.type === 'custom').length;
    const newModel = {
      id: `custom${customCount + 1}`,
      name: `내 사진 ${customCount + 1}`,
      type: 'custom' as const,
    };
    setModelList([...modelList, newModel]);
  };

  const selectedModelName = modelList.find((m) => m.id === selectedModel)?.name;

  return (
    <ModelSelectorWrapper>
      <SelectorContainer
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <SelectorButton>
          {selectedModelName} <ArrowIcon />
        </SelectorButton>

        {isOpen && (
          <DropdownMenu>
            {modelList.map((model) => (
              <MenuItem
                key={model.id}
                onClick={() => {
                  setSelectedModel(model.id);
                  setIsOpen(false);
                }}
              >
                {model.name}
              </MenuItem>
            ))}
            <MenuItem onClick={addCustomModel}>추가하기</MenuItem>
          </DropdownMenu>
        )}
      </SelectorContainer>
    </ModelSelectorWrapper>
  );
};

export default ModelSelector;
