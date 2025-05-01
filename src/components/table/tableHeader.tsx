import { ReactNode } from "react";

interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}
const TableHeader = ({ children, className }: TableHeaderProps) => {
  return (
    <th
      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}
    >
      {children}
    </th>
  );
};
export default TableHeader;
