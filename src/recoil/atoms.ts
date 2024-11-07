import { atom } from 'recoil';
import { ModelItem, ModelType } from '../types';

// 현재 모델 상태
export const currentModelState = atom<ModelItem>({
  key: 'currentModelState',
  default: {
    id: 0,  // 기본값은 0으로 설정
    itemImageUrl: '',  // 아이템 이미지는 없음
    modelImageUrl: '/images/models/default-model.png',  // 기본 모델 이미지
  }
});

// 히스토리 상태
export const historyState = atom<ModelItem[]>({
  key: 'historyState',
  default: []  // 빈 배열로 초기화
});

// 나머지 상태들은 그대로 유지
export const modelListState = atom<ModelType[]>({
  key: 'modelListState',
  default: [
    { id: 'male', name: '남자 모델', type: 'default' },
    { id: 'female', name: '여자 모델', type: 'default' }
  ]
});

export const selectedModelState = atom({
  key: 'selectedModelState',
  default: 'male'
});

export const isSelectorOpenState = atom({
  key: 'isSelectorOpenState',
  default: false
});