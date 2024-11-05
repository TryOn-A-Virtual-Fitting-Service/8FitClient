import { atom } from 'recoil';
import { ModelItem } from '../types';

// 현재 모델 상태
export const currentModelState = atom<ModelItem>({
  key: 'currentModelState',
  default: {
    id: 1,
    itemimageUrl: '/images/items/item1.png',
    modelImageUrl: '/images/models/model1.png',

  }
});
// 히스토리 상태
export const historyState = atom<ModelItem[]>({
  key: 'historyState',
  default: [
    {
      id: 1,
      itemimageUrl: '/images/items/item1.png',
      modelImageUrl: '/images/models/model1.png',
    },
    {
      id: 2,
      itemimageUrl: '/images/items/item2.png',
      modelImageUrl: '/images/models/model2.png',
    },
    {
      id: 3,
      itemimageUrl: '/images/items/item3.png',
      modelImageUrl: '/images/models/model3.png',
    },
    {
      id: 4,
      itemimageUrl: '/images/items/item4.png',
      modelImageUrl: '/images/models/model4.png',
    },
    {
      id: 5,
      itemimageUrl: '/images/items/item5.png',
      modelImageUrl: '/images/models/model5.png',
    },
    {
      id: 6,
      itemimageUrl: '/images/items/item6.png',
      modelImageUrl: '/images/models/model6.png',
    },
  ]
});