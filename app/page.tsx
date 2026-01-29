'use client';

import { useEffect, useState, useMemo } from 'react';
import AgeBarChart from '@/components/AgeBarChart';
import AgePieChart from '@/components/AgePieChart';
import SummaryCards from '@/components/SummaryCards';
import DetailTable from '@/components/DetailTable';
import SupplierFilter from '@/components/SupplierFilter';
import { DataItem } from '@/lib/types';
import {
  parseCSVData,
  aggregateByAge,
  getSupplierList,
  filterBySupplier,
  calculateTotalAmount,
  convertToChartData,
} from '@/lib/dataProcessor';

export default function Home() {
  const [allData, setAllData] = useState<DataItem[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState('全部供应商');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 加载CSV数据
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const response = await fetch('/data/21051109.csv');
        if (!response.ok) {
          throw new Error('无法加载数据文件');
        }
        const csvText = await response.text();
        const parsedData = await parseCSVData(csvText);
        setAllData(parsedData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : '数据加载失败');
        console.error('Error loading data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  // 计算筛选后的数据
  const filteredData = useMemo(() => {
    return filterBySupplier(allData, selectedSupplier);
  }, [allData, selectedSupplier]);

  // 计算汇总数据
  const aggregations = useMemo(() => {
    return aggregateByAge(filteredData);
  }, [filteredData]);

  // 计算总金额
  const totalAmount = useMemo(() => {
    return calculateTotalAmount(filteredData);
  }, [filteredData]);

  // 转换为图表数据
  const chartData = useMemo(() => {
    return convertToChartData(aggregations);
  }, [aggregations]);

  // 获取供应商列表
  const supplierList = useMemo(() => {
    return getSupplierList(allData);
  }, [allData]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">加载数据中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold mb-2">加载失败</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            费用Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            其他应付款账龄分析 - 截止日期：2025/12/31
          </p>
        </div>

        {/* 供应商筛选器 */}
        <SupplierFilter
          suppliers={supplierList}
          selectedSupplier={selectedSupplier}
          onSupplierChange={setSelectedSupplier}
        />

        {/* 统计卡片 */}
        <SummaryCards aggregations={aggregations} totalAmount={totalAmount} />

        {/* 图表区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <AgeBarChart data={chartData} />
          <AgePieChart data={chartData} />
        </div>

        {/* 明细表格 */}
        <DetailTable data={filteredData} />

        {/* 页脚 */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>数据总计：{filteredData.length} 笔交易</p>
        </div>
      </div>
    </main>
  );
}
