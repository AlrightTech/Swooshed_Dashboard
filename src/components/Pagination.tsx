

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex my-5">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`mx-1 px-3 py-2 rounded-md ${
            currentPage === number ? 'bg-primary text-white' : 'bg-white text-black'
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
