import Papa from 'papaparse';
import { CSVRow, DataItem, AgeGroup, AgeAggregation, ChartDataPoint } from './types';

// 截止日期
const CUTOFF_DATE = new Date('2025/12/31');

/**
 * 解析CSV文件
 */
export async function parseCSVData(csvText: string): Promise<DataItem[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<CSVRow>(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const dataItems: DataItem[] = [];
          
          for (const row of results.data) {
            // 只处理其他应付款数据
            if (!row['总账科目'] || row['总账科目'] !== '21051109') {
              continue;
            }
            
            // 只处理有凭证日期和金额的行
            if (!row['凭证日期'] || !row['本币金额']) {
              continue;
            }
            
            // 解析金额（移除逗号，转换为数字，取绝对值）
            const amountStr = row['本币金额'].replace(/,/g, '');
            const amount = Math.abs(parseFloat(amountStr));
            
            // 跳过金额为0或无效的行
            if (isNaN(amount) || amount === 0) {
              continue;
            }
            
            // 解析凭证日期
            const voucherDate = new Date(row['凭证日期']);
            if (isNaN(voucherDate.getTime())) {
              continue; // 跳过无效日期
            }
            
            // 计算账龄天数
            const daysOld = calculateDaysOld(voucherDate);
            
            // 计算账龄分组
            const ageGroup = calculateAgeGroup(daysOld);
            
            dataItems.push({
              voucherDate,
              voucherDateStr: row['凭证日期'],
              supplier: row['供应商'] || row['贸易伙伴名'] || '未知供应商',
              amount,
              daysOld,
              ageGroup,
              description: row['文本'] || '',
              voucherNumber: row['凭证编号'] || '',
            });
          }
          
          resolve(dataItems);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

/**
 * 计算从凭证日期到截止日期的天数
 */
export function calculateDaysOld(voucherDate: Date): number {
  const diffTime = CUTOFF_DATE.getTime() - voucherDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * 根据天数计算账龄分组
 */
export function calculateAgeGroup(daysOld: number): AgeGroup {
  if (daysOld <= 30) {
    return '0-30天';
  } else if (daysOld <= 60) {
    return '31-60天';
  } else if (daysOld <= 90) {
    return '61-90天';
  } else {
    return '90天以上';
  }
}

/**
 * 按账龄分组汇总金额
 */
export function aggregateByAge(dataItems: DataItem[]): AgeAggregation[] {
  const groups: Record<AgeGroup, { totalAmount: number; count: number }> = {
    '0-30天': { totalAmount: 0, count: 0 },
    '31-60天': { totalAmount: 0, count: 0 },
    '61-90天': { totalAmount: 0, count: 0 },
    '90天以上': { totalAmount: 0, count: 0 },
  };

  for (const item of dataItems) {
    groups[item.ageGroup].totalAmount += item.amount;
    groups[item.ageGroup].count += 1;
  }

  return [
    { ageGroup: '0-30天', ...groups['0-30天'] },
    { ageGroup: '31-60天', ...groups['31-60天'] },
    { ageGroup: '61-90天', ...groups['61-90天'] },
    { ageGroup: '90天以上', ...groups['90天以上'] },
  ];
}

/**
 * 获取供应商列表
 */
export function getSupplierList(dataItems: DataItem[]): string[] {
  const suppliers = new Set<string>();
  for (const item of dataItems) {
    suppliers.add(item.supplier);
  }
  return ['全部供应商', ...Array.from(suppliers).sort()];
}

/**
 * 按供应商筛选数据
 */
export function filterBySupplier(
  dataItems: DataItem[],
  supplier: string
): DataItem[] {
  if (supplier === '全部供应商') {
    return dataItems;
  }
  return dataItems.filter((item) => item.supplier === supplier);
}

/**
 * 计算总金额
 */
export function calculateTotalAmount(dataItems: DataItem[]): number {
  return dataItems.reduce((sum, item) => sum + item.amount, 0);
}

/**
 * 将账龄汇总数据转换为图表数据
 */
export function convertToChartData(aggregations: AgeAggregation[]): ChartDataPoint[] {
  return aggregations.map((agg) => ({
    name: agg.ageGroup,
    value: agg.totalAmount,
    label: formatCurrency(agg.totalAmount),
  }));
}

/**
 * 格式化货币
 */
export function formatCurrency(amount: number): string {
  return amount.toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
