import React, { useState } from 'react';

const Table = ({ sales }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    if (sales.length === 0) {
        return <div>No data available</div>;
    }

    const keys = sales.length > 0 ? Object.keys(sales[0]) : [];

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = sales.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(sales.length / rowsPerPage);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="table">
            <table className="styled_table">
                <thead>
                <tr>
                    {keys.map(key => <th key={key}>{key}</th>)}
                </tr>
                </thead>
                <tbody>
                {currentRows.map((sale, index) => (
                    <tr key={index}>
                        {keys.map((key, idx) => <td key={idx}>{sale[key]}</td>)}
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index + 1} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Table;
