'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { ChartDataPoint } from '@/lib/types';
import { formatCurrency } from '@/lib/dataProcessor';

interface AgeBarChartProps {
  data: ChartDataPoint[];
}

// 颜色映射
const COLOR_MAP: Record<string, string> = {
  '0-30天': '#10b981',
  '31-60天': '#f59e0b',
  '61-90天': '#f97316',
  '90天以上': '#ef4444',
};

export default function AgeBarChart({ data }: AgeBarChartProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">账龄分布柱状图</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#666' }}
          />
          <YAxis 
            tick={{ fill: '#666' }}
            tickFormatter={(value) => `¥${(value / 10000).toFixed(0)}万`}
          />
          <Tooltip 
            formatter={(value: number) => [`¥${formatCurrency(value)}`, '金额']}
            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid #ccc' }}
          />
          <Legend />
          <Bar 
            dataKey="value" 
            name="应付金额"
            radius={[8, 8, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLOR_MAP[entry.name] || '#8884d8'} />
            ))}
            <LabelList 
              dataKey="value" 
              position="top" 
              formatter={(value: number) => `¥${(value / 10000).toFixed(1)}万`}
              style={{ fill: '#333', fontWeight: 'bold', fontSize: '12px' }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
