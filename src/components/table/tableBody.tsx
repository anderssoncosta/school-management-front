import { Children, isValidElement, ReactNode } from "react";

interface TableBodyProps {
  children: ReactNode;
  emptyMessage?: string;
  colSpan?: number;
}
const TableBody = ({
  children,
  emptyMessage = "No data found.",
  colSpan = 5,
}: TableBodyProps) => {
  const hasRows = Children.toArray(children).some((child) =>
    isValidElement(child)
  );
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {hasRows ? (
        children
      ) : (
        <tr>
          <td colSpan={colSpan} className="text-center py-8 text-gray-500">
            {emptyMessage}
          </td>
        </tr>
      )}
    </tbody>
  );
};
export default TableBody;
