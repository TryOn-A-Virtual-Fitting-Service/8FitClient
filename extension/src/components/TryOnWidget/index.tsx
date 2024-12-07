import React, { useEffect } from "react"; // useEffect 추가
import { useSetRecoilState, useRecoilValue } from "recoil";
import TryOnButtonContainer from "./TryOnButtonContainer";
import {
  historyState,
  currentModelState,
  selectedModelState,
} from "@/recoil/atoms"; // Recoil state 추가
import {
  WidgetContainer,
  Rectangle,
  Title,
  BrandImage,
  Description,
} from "@styles/TryOnWidget";
import History from "./History";
import ModelView from "./ModelView";
import { fetchHistory } from "@/api/history"; // API 함수 import 추가

const TryOnWidget: React.FC = () => {
  // Recoil setter 추가
  const setHistory = useSetRecoilState(historyState);
  const setCurrentModel = useSetRecoilState(currentModelState);
  const selectedModel = useRecoilValue(selectedModelState);
  // useEffect와 API 호출 로직 추가
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const deviceId = import.meta.env.VITE_DEVICE_ID;
        const response = await fetchHistory(deviceId);

        // 응답 구조 확인
        if (
          !response ||
          !response.result ||
          !Array.isArray(response.result.models)
        ) {
          console.error("Invalid response structure:", response);
          setHistory([]); // 기본값 설정
          return;
        }

        const modelItems = response.result.models.map((model) => ({
          id: model.modelId,
          itemImageUrl: model.fittings[0]?.itemImageUrl || "", // 첫 번째 fitting의 itemImageUrl
          modelImageUrl: model.modelImageUrl,
          fittings: model.fittings.map((fitting) => ({
            fittingId: fitting.fittingId,
            fittingImageUrl: fitting.fittingImageUrl,
            itemImageUrl: fitting.itemImageUrl,
          })),
        }));

        setHistory(modelItems);

        // History가 비어있으면 기본 모델 유지
        if (modelItems.length > 0) {
          setCurrentModel(modelItems[0]);
        } else {
          // 선택된 모델 타입에 따라 기본 모델 설정
          setCurrentModel({
            id: 0,
            modelImageUrl: "",
            fittings: [
              {
                // 기본 fitting 추가
                fittingId: 0,
                fittingImageUrl: "",
                itemImageUrl: "",
              },
            ],
          });
        }
      } catch (error) {
        console.error("Failed to load history:", error);
        // 에러 발생시에도 기본 모델 설정
        setCurrentModel({
          id: 0,
          modelImageUrl: "",
          fittings: [
            {
              fittingId: 0,
              fittingImageUrl: "",
              itemImageUrl: "",
            },
          ],
        });
      }
    };

    loadHistory();
  }, [setHistory, setCurrentModel, selectedModel]);

  // 나머지 JSX는 동일
  return (
    <WidgetContainer>
      <Rectangle />
      <Title>
        <BrandImage src="https://8fit.xyz/images/brands/musinsa.png" />× 8Fit
      </Title>
      <Description>온라인에서도 옷을 직접 입어보세요</Description>
      <ModelView />
      <History />
      <TryOnButtonContainer />
    </WidgetContainer>
  );
};

export default TryOnWidget;
