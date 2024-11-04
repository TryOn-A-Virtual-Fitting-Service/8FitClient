import { atom } from 'recoil';
import { ModelItem } from '../types';

// 현재 모델 상태
export const currentModelState = atom<ModelItem>({
  key: 'currentModelState',
  default: {
    id: 1,
    imageUrl: '/images/items/item1.png',
    modelImageUrl: '/images/models/model1.png',
    name: '아이템 1'
  }
});
// 히스토리 상태
export const historyState = atom<ModelItem[]>({
  key: 'historyState',
  default: [
    {
      id: 1,
      imageUrl: '/images/items/item1.png',
      modelImageUrl: '/images/models/model1.png',
      name: '아이템 1'
    },
    {
      id: 2,
      imageUrl: '/images/items/item2.png',
      modelImageUrl: '/images/models/model2.png',
      name: '아이템 2'
    },
    {
      id: 3,
      imageUrl: '/images/items/item3.png',
      modelImageUrl: '/images/models/model3.png',
      name: '아이템 3'
    },
    {
      id: 4,
      imageUrl: '/images/items/item4.png',
      modelImageUrl: '/images/models/model4.png',
      name: '아이템 4'
    },
    {
      id: 5,
      imageUrl: '/images/items/item5.png',
      modelImageUrl: '/images/models/model5.png',
      name: '아이템 5'
    },
    {
      id: 6,
      imageUrl: '/images/items/item6.png',
      modelImageUrl: '/images/models/model6.png',
      name: '아이템 6'
    }
  ]
});