import React, { useState, useMemo, useCallback } from 'react';
import { DataTableProps, Column, SortState, SortDirection } from '../types/DataTable';

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortState, setSortState] = useState<SortState>({ key: null, direction: null });
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Generate unique row IDs for selection
  const rowIds = useMemo(() => {
    return data.map((_, index) => `row-${index}`);
  }, [data]);

  // Handle sorting
  const handleSort = useCallback((columnKey: string) => {
    setSortState(prev => {
      if (prev.key === columnKey) {
        if (prev.direction === 'asc') {
          return { key: columnKey, direction: 'desc' };
        } else if (prev.direction === 'desc') {
          return { key: null, direction: null };
        }
      }
      return { key: columnKey, direction: 'asc' };
    });
  }, []);

  // Sort data based on current sort state
  const sortedData = useMemo(() => {
    if (!sortState.key || !sortState.direction) return data;

    const column = columns.find(col => col.key === sortState.key);
    if (!column) return data;

    return [...data].sort((a, b) => {
      const aValue = a[column.dataIndex];
      const bValue = b[column.dataIndex];

      if (aValue === bValue) return 0;
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      const comparison = aValue < bValue ? -1 : 1;
      return sortState.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, columns, sortState]);

  // Handle row selection
  const handleRowSelect = useCallback((rowId: string) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(rowId)) {
      newSelectedRows.delete(rowId);
    } else {
      newSelectedRows.add(rowId);
    }
    setSelectedRows(newSelectedRows);

    if (onRowSelect) {
      const selectedData = sortedData.filter((_, index) => 
        newSelectedRows.has(`row-${index}`)
      );
      onRowSelect(selectedData);
    }
  }, [selectedRows, sortedData, onRowSelect]);

  // Handle select all
  const handleSelectAll = useCallback(() => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
      if (onRowSelect) onRowSelect([]);
    } else {
      setSelectedRows(new Set(rowIds));
      if (onRowSelect) onRowSelect(sortedData);
    }
  }, [selectedRows.size, data.length, rowIds, sortedData, onRowSelect]);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8" role="status" aria-label="Loading data">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading...</span>
      </div>
    );
  }

  // Empty state
  if (data.length === 0) {
    return (
      <div className="text-center py-8" role="status" aria-label="No data available">
        <div className="text-gray-500 text-lg">No data available</div>
        <div className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200" role="table" aria-label="Data table">
        <thead className="bg-gray-50">
          <tr>
            {selectable && (
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={selectedRows.size === data.length}
                  onChange={handleSelectAll}
                  aria-label="Select all rows"
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                }`}
                onClick={() => column.sortable && handleSort(column.key)}
                role={column.sortable ? 'button' : undefined}
                tabIndex={column.sortable ? 0 : undefined}
                aria-label={column.sortable ? `Sort by ${column.title}` : undefined}
                onKeyDown={(e) => {
                  if (column.sortable && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    handleSort(column.key);
                  }
                }}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.title}</span>
                  {column.sortable && sortState.key === column.key && (
                    <span className="ml-1">
                      {sortState.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((row, rowIndex) => {
            const rowId = `row-${rowIndex}`;
            const isSelected = selectedRows.has(rowId);
            
            return (
              <tr
                key={rowId}
                className={`hover:bg-gray-50 ${
                  isSelected ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                }`}
                role="row"
                aria-selected={selectable ? isSelected : undefined}
              >
                {selectable && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={isSelected}
                      onChange={() => handleRowSelect(rowId)}
                      aria-label={`Select row ${rowIndex + 1}`}
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {String(row[column.dataIndex] ?? '')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
