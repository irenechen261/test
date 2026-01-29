'use client';

import { AgeAggregation } from '@/lib/types';
import { formatCurrency } from '@/lib/dataProcessor';

interface SummaryCardsProps {
  aggregations: AgeAggregation[];
  totalAmount: number;
}

const CARD_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  '总计': { bg: 'bg-gradient-to-br from-blue-500 to-blue-600', text: 'text-white', border: 'border-blue-300' },
  '0-30天': { bg: 'bg-gradient-to-br from-green-500 to-green-600', text: 'text-white', border: 'border-green-300' },
  '31-60天': { bg: 'bg-gradient-to-br from-yellow-500 to-yellow-600', text: 'text-white', border: 'border-yellow-300' },
  '61-90天': { bg: 'bg-gradient-to-br from-orange-500 to-orange-600', text: 'text-white', border: 'border-orange-300' },
  '90天以上': { bg: 'bg-gradient-to-br from-red-500 to-red-600', text: 'text-white', border: 'border-red-300' },
};

export default function SummaryCards({ aggregations, totalAmount }: SummaryCardsProps) {
  const cards = [
    { label: '总计', amount: totalAmount, count: aggregations.reduce((sum, agg) => sum + agg.count, 0) },
    ...aggregations.map(agg => ({ label: agg.ageGroup, amount: agg.totalAmount, count: agg.count })),
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {cards.map((card) => {
        const colors = CARD_COLORS[card.label];
        return (
          <div
            key={card.label}
            className={`${colors.bg} rounded-lg shadow-lg p-6 border-2 ${colors.border} transform transition-transform hover:scale-105`}
          >
            <div className={colors.text}>
              <h3 className="text-sm font-medium opacity-90 mb-2">{card.label}</h3>
              <p className="text-2xl font-bold mb-1">¥{formatCurrency(card.amount)}</p>
              <p className="text-xs opacity-80">{card.count} 笔交易</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
