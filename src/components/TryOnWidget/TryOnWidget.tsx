// src/components/TryOnWidget/TryOnWidget.tsx
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';

interface ClothingItem {
  id: string;
  imageUrl: string;
}

interface TryOnWidgetProps {
  initialModelImage: string;
}

const TryOnWidget: React.FC<TryOnWidgetProps> = ({ initialModelImage }) => {
  const [currentModelImage, setCurrentModelImage] = useState(initialModelImage);
  const [history, setHistory] = useState<ClothingItem[]>([]);
  
  return (
    <Card className="fixed right-4 top-1/4 w-80 shadow-lg">
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">MUSINSA × TryOn</h2>
        
        {/* Model View */}
        <div className="mb-4">
          <img 
            src={currentModelImage} 
            alt="Model View" 
            className="w-full rounded-lg"
          />
        </div>
        
        {/* History Section */}
        <div className="mb-4">
          <div className="flex overflow-x-auto gap-2">
            {history.map((item) => (
              <img
                key={item.id}
                src={item.imageUrl}
                alt="History item"
                className="w-16 h-16 rounded object-cover"
              />
            ))}
          </div>
        </div>
        
        {/* Try On Button */}
        <button
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
          onClick={() => {
            // API 호출 로직이 들어갈 자리
          }}
        >
          상의 입어보기
        </button>
      </div>
    </Card>
  );
};

export default TryOnWidget;