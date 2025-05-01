import { ReactNode } from "react";

interface TableRootProps {
  children: ReactNode;
  className?: string;
}

const TableRoot = ({ children, className }: TableRootProps) => {
  return (
    <div className="overflow-auto rounded-md border border-gray-200 shadow-sm">
      <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
        {children}
      </table>
    </div>
  );
};
export default TableRoot;
