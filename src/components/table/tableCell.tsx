import { ReactNode } from "react";

interface TableCellProps {
  children: ReactNode;
  className?: string;
}
export function TableCell({ children, className }: TableCellProps) {
  return (
    <td
      className={`px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700  ${className}`}
    >
      {children}
    </td>
  );
}
export default TableCell;
