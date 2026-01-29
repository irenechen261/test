// 账龄分组类型
export type AgeGroup = '0-30天' | '31-60天' | '61-90天' | '90天以上';

// CSV原始数据行
export interface CSVRow {
  '已清项目/未清项目符号': string;
  '总账科目': string;
  '总账科目长文本': string;
  '冲销科目记帐': string;
  '凭证类型': string;
  '凭证编号': string;
  '物料': string;
  '行项目': string;
  '过账日期': string;
  '凭证日期': string;
  '借/贷标识': string;
  '过账码': string;
  '业务范围': string;
  '业务部门描述': string;
  '本币金额': string;
  '本币': string;
  '以凭证货币计的金额': string;
  '凭证货币': string;
  '税码': string;
  '业务地点': string;
  '文本': string;
  '客户': string;
  '供应商': string;
  '贸易伙伴名': string;
  '税号 2': string;
  '成本中心': string;
  '名称': string;
  '订单': string;
  '分配': string;
  '参考代码 1': string;
  '参考代码 2': string;
  '参考码3': string;
  '清帐日期': string;
  '清帐凭证': string;
  '冲销科目类型': string;
}

// 处理后的数据项
export interface DataItem {
  voucherDate: Date;
  voucherDateStr: string;
  supplier: string;
  amount: number; // 绝对值，正数
  daysOld: number;
  ageGroup: AgeGroup;
  description: string;
  voucherNumber: string;
}

// 账龄汇总数据
export interface AgeAggregation {
  ageGroup: AgeGroup;
  totalAmount: number;
  count: number;
}

// 图表数据点
export interface ChartDataPoint {
  name: string;
  value: number;
  label?: string;
}
