import React from 'react';
import { View } from 'react-native';

interface ProgressDotsProps {
  total: number;
  current: number;
}

const ProgressDots: React.FC<ProgressDotsProps> = ({ total, current }) => {
  return (
    <View className="flex-row items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          className={`transition-all ${
            index === current
              ? 'h-2 w-6 rounded-full bg-aurora-start'
              : 'h-2 w-2 rounded-full bg-text-quaternary'
          }`}
        />
      ))}
    </View>
  );
};

export default ProgressDots;
