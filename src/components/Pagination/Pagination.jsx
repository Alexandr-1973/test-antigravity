import Icon from '../Icon/Icon';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        const showPages = 5;

        let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
        let endPage = Math.min(totalPages, startPage + showPages - 1);

        if (endPage - startPage + 1 < showPages) {
            startPage = Math.max(1, endPage - showPages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        <div className="pagination">
            <button
                className="pagination__btn pagination__btn--nav"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
            >
                <Icon name="chevron-left" size={16} />
            </button>

            <div className="pagination__pages">
                {getPageNumbers().map((page) => (
                    <button
                        key={page}
                        className={`pagination__btn pagination__btn--page ${currentPage === page ? 'pagination__btn--active' : ''
                            }`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                className="pagination__btn pagination__btn--nav"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
            >
                <Icon name="chevron-right" size={16} />
            </button>
        </div>
    );
};

export default Pagination;
