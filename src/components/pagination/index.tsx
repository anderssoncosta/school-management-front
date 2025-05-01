import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const canGoBack = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const generatePages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(currentPage - i) <= 1) {
        pages.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push("...");
      }
    }

    return [...new Set(pages)];
  };

  return (
    <div className="flex justify-center rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm mt-2">
      <nav className="inline-flex items-center space-x-1 ">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoBack}
          className="p-2 text-sm rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>

        {generatePages().map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 text-sm rounded-md ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-2 py-1 text-gray-500 text-sm">
              ...
            </span>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          className="p-2 text-sm rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
