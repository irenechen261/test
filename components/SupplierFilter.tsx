'use client';

interface SupplierFilterProps {
  suppliers: string[];
  selectedSupplier: string;
  onSupplierChange: (supplier: string) => void;
}

export default function SupplierFilter({ 
  suppliers, 
  selectedSupplier, 
  onSupplierChange 
}: SupplierFilterProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center gap-4">
        <label htmlFor="supplier-select" className="text-sm font-medium text-gray-700">
          筛选供应商：
        </label>
        <select
          id="supplier-select"
          value={selectedSupplier}
          onChange={(e) => onSupplierChange(e.target.value)}
          className="flex-1 max-w-md px-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          {suppliers.map((supplier) => (
            <option key={supplier} value={supplier}>
              {supplier}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
