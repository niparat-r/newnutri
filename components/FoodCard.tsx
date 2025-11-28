import React from 'react';
import { FoodItem } from '../types';

interface FoodCardProps {
  item: FoodItem;
  categoryName: string;
  isSpinning?: boolean;
}

const FoodCard: React.FC<FoodCardProps> = ({ item, categoryName, isSpinning = false }) => {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    if (score >= 5) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  if (isSpinning) {
    return (
      <div className="h-64 w-full rounded-2xl bg-white shadow-sm border-2 border-slate-100 flex flex-col items-center justify-center animate-pulse">
        <span className="text-4xl">🎰</span>
        <p className="mt-4 text-slate-400 font-kanit">กำลังสุ่ม...</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full rounded-2xl bg-white shadow-lg border border-slate-100 overflow-hidden flex flex-col transition-all hover:-translate-y-1 duration-300">
      <div className="bg-slate-50 p-3 border-b border-slate-100 flex justify-between items-center">
        <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">{categoryName}</span>
        <span className={`text-xs px-2 py-1 rounded-full font-bold border ${getScoreColor(item.health_score)}`}>
          Score: {item.health_score}
        </span>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-slate-800 mb-1">{item.name_th}</h3>
        <p className="text-sm text-slate-400 mb-4 italic">{item.name_en}</p>
        <p className="text-sm text-slate-600 mb-4 flex-grow">{item.description_th}</p>
        
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-500">
          <div className="flex justify-between bg-slate-50 p-2 rounded">
            <span>Cal</span>
            <span className="font-bold text-slate-700">{item.calories_kcal}</span>
          </div>
          <div className="flex justify-between bg-slate-50 p-2 rounded">
            <span>Prot</span>
            <span className="font-bold text-slate-700">{item.protein_g}g</span>
          </div>
          <div className="flex justify-between bg-slate-50 p-2 rounded">
            <span>Sugar</span>
            <span className="font-bold text-slate-700">{item.sugar_g}g</span>
          </div>
          <div className="flex justify-between bg-slate-50 p-2 rounded">
            <span>Fat</span>
            <span className="font-bold text-slate-700">{item.fat_g}g</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;