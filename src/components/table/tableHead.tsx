import { ReactNode } from "react";

interface TableHeadProps {
  children: ReactNode;
}
const TableHead = ({ children }: TableHeadProps) => {
  return (
    <thead className="bg-gray-50">
      <tr>{children}</tr>
    </thead>
  );
};
export default TableHead;
