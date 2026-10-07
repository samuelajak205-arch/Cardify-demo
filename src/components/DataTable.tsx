import React from "react";

interface Column<T> {
  header: string;
  accessor: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  emptyState?: React.ReactNode;
}

export default function DataTable<T>({ data, columns, keyExtractor, emptyState }: DataTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-[0_4px_20px_rgba(0,0,0,0.01)] select-none">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/65">
            {columns.map((col, index) => (
              <th
                key={index}
                className={`py-3 px-4.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider ${col.className || ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-8 text-center">
                {emptyState || (
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                    No records found
                  </span>
                )}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr 
                key={keyExtractor(item)} 
                className="hover:bg-slate-50/40 dark:hover:bg-slate-700/20 transition-colors"
              >
                {columns.map((col, index) => (
                  <td
                    key={index}
                    className={`py-3.5 px-4.5 text-xs text-slate-600 dark:text-slate-300 font-medium align-middle ${col.className || ""}`}
                  >
                    {col.accessor(item)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
