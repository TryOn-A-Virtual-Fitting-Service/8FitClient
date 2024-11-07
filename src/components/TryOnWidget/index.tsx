import React, { useEffect } from 'react'; // useEffect 추가
import { useSetRecoilState } from 'recoil'; // Recoil hook 추가
import { historyState, currentModelState } from '@/recoil/atoms'; // Recoil state 추가
import {
  WidgetContainer,
  Rectangle,
  Title,
  BrandImage,
  Description,
  TryOnButton,
} from '@styles/TryOnWidget';
import History from './History';
import ModelView from './ModelView';
import { fetchHistory } from '@/api/history'; // API 함수 import 추가

const TryOnWidget: React.FC = () => {
  // Recoil setter 추가
  const setHistory = useSetRecoilState(historyState);
  const setCurrentModel = useSetRecoilState(currentModelState);

  // useEffect와 API 호출 로직 추가
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const deviceId = 'validDeviceId123'; // 실제 deviceId 사용
        const response = await fetchHistory(deviceId);

        const modelItems = response.result.models.map((model) => ({
          id: model.modelId,
          itemImageUrl: model.itemImageUrl,
          modelImageUrl: model.modelImageUrl,
        }));

        setHistory(modelItems);

        if (modelItems.length > 0) {
          setCurrentModel(modelItems[0]);
        }
      } catch (error) {
        console.error('Failed to load history:', error);
      }
    };

    loadHistory();
  }, [setHistory, setCurrentModel]);

  // 나머지 JSX는 동일
  return (
    <WidgetContainer>
      <Rectangle />
      <Title>
        <BrandImage src='/images/brands/musinsa.png' />× 8Fit
      </Title>
      <Description>온라인에서도 옷을 직접 입어보세요</Description>

      <ModelView />
      <History />

      <TryOnButton>상의 입어보기</TryOnButton>
    </WidgetContainer>
  );
};

export default TryOnWidget;
