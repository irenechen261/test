'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartDataPoint } from '@/lib/types';
import { formatCurrency } from '@/lib/dataProcessor';

interface AgePieChartProps {
  data: ChartDataPoint[];
}

// 颜色映射
const COLORS: Record<string, string> = {
  '0-30天': '#10b981',
  '31-60天': '#f59e0b',
  '61-90天': '#f97316',
  '90天以上': '#ef4444',
};

// 自定义标签
const renderCustomLabel = (entry: any) => {
  const percent = entry.percent * 100;
  if (percent < 3) return ''; // 太小的不显示
  return `${percent.toFixed(1)}%`;
};

export default function AgePieChart({ data }: AgePieChartProps) {
  // 过滤掉金额为0的项
  const filteredData = data.filter(item => item.value > 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">账龄占比饼图</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={filteredData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {filteredData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#8884d8'} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`¥${formatCurrency(value)}`, '金额']}
            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid #ccc' }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value, entry: any) => {
              const item = filteredData.find(d => d.name === value);
              const total = filteredData.reduce((sum, d) => sum + d.value, 0);
              const percent = item ? ((item.value / total) * 100).toFixed(1) : '0';
              return `${value} (${percent}%)`;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
