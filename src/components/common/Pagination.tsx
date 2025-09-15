
interface PaginationProps {
  currentPage: number;
  perPage: number;
  total: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  perPage,
  total,
  lastPage,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border-t border-gray-200 text-sm text-gray-600 gap-3">
      {/* Info */}
      <div className="text-gray-700">
        Showing {(currentPage - 1) * perPage + 1}–
        {Math.min(currentPage * perPage, total)} of {total}
      </div>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {/* Prev */}
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-lg border transition duration-200 ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white hover:bg-blue-50 border-blue-300"
          }`}
        >
          Prev
        </button>

        {/* Page numbers */}
        {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-lg border transition duration-200 ${
              currentPage === page
                ? "bg-blue-600 text-white border-blue-600 shadow"
                : "bg-white text-gray-700 hover:bg-blue-50 border-gray-300"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, lastPage))}
          disabled={currentPage === lastPage}
          className={`px-3 py-1 rounded-lg border transition duration-200 ${
            currentPage === lastPage
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white hover:bg-blue-50 border-blue-300"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
