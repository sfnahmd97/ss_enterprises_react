
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
        {(() => {
          // Logic to generate page numbers with dots
          const getPageNumbers = () => {
             // If pages are few, show all
            if (lastPage <= 7) {
              return Array.from({ length: lastPage }, (_, i) => i + 1);
            }

            // Always include first 2
            const startPages = [1, 2].filter(p => p <= lastPage);
            // Always include last page
            const endPages = [lastPage];
            // Include current and immediate siblings
            const siblings = [currentPage - 1, currentPage, currentPage + 1].filter(
              (p) => p > 0 && p <= lastPage
            );

            // Merge and sort unique
            const uniquePages = Array.from(
              new Set([...startPages, ...siblings, ...endPages])
            ).sort((a, b) => a - b);

            const result: (number | string)[] = [];
            let prev = 0;

            for (const p of uniquePages) {
              if (prev > 0) {
                if (p - prev === 2) {
                  result.push(prev + 1); // Fill single gap
                } else if (p - prev > 2) {
                  result.push("..."); // Add ellipsis for larger gaps
                }
              }
              result.push(p);
              prev = p;
            }

            return result;
          };

          return getPageNumbers().map((page, index) => (
            <button
              key={`${page}-${index}`}
              onClick={() => typeof page === "number" && onPageChange(page)}
              disabled={page === "..."}
              className={`px-3 py-1 rounded-lg border transition duration-200 ${
                currentPage === page
                  ? "bg-blue-600 text-white border-blue-600 shadow"
                  : page === "..."
                  ? "border-transparent text-gray-500 cursor-default px-2"
                  : "bg-white text-gray-700 hover:bg-blue-50 border-gray-300"
              }`}
            >
              {page}
            </button>
          ));
        })()}

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
