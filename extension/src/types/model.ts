import { WidgetModel } from '@/types/api';

// API 응답 구조에 맞게 ModelItem 타입 수정
export interface ModelItem extends Omit<WidgetModel, 'modelId'> {
  id: number;  // modelId를 id로 변환
}

// 나머지 타입들은 그대로 유지
export interface ModelImage {
  id: string;
  imageUrl: string;
  timestamp: string;
}

export type ModelType = {
  id: string;
  name: string;
  type: 'default' | 'custom';
};