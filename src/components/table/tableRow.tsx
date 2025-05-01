import { ReactNode } from "react";

interface TableRowProps {
  children: ReactNode;
}
const TableRow = ({ children }: TableRowProps) => {
  return <tr className="hover:bg-gray-50">{children}</tr>;
};
export default TableRow;
