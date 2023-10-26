import React from "react";
import style from "./Pagination.module.css";


const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  const handleClick = (page) => {
    window.scroll({ top: 0, behavior: "smooth" }); //desplaza el navegador hacia la parte superior
    onPageChange(page); // Envía la acción para actualizar la página actual en Redux
  };
  const handleNext = () => {
    console.log("Next Page");
    window.scroll({ top: 0, behavior: "smooth" });
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  const handlePrevious = () => {
    console.log("Previous Page");
    window.scroll({ top: 0, behavior: "smooth" });
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const renderPageNumbers = () => {// funcion encargada de mostrar la paginacion 
    const pageNumbers = []; // array donde se guardaran los botones de las paginas 
    const maxDisplayedPages = 5;
    let startPage = currentPage - Math.floor(maxDisplayedPages / 2);
    let endPage = currentPage + Math.floor(maxDisplayedPages / 2);

    if (startPage <= 0) { // condicion para evitar numeros negativos
      endPage -= startPage - 1;
      startPage = 1;
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      if (endPage - maxDisplayedPages + 1 > 0) {
        startPage = endPage - maxDisplayedPages + 1;
      } else {
        startPage = 1; // asegura su inicio en 1 
      }
    }

    if (totalPages > 1) {
      for (let page = startPage; page <= endPage; page++) {
        pageNumbers.push(
          <button
            key={page}
            onClick={() => handleClick(page)}
            className={currentPage === page ? style.active : ""}
          >
            {page}
          </button>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div>
      {renderPageNumbers().length > 0 ? (
        <ul className="pagination">
          <button onClick={handlePrevious}>Prev</button>
          {renderPageNumbers()}
          <button onClick={handleNext}>Next</button>
        </ul>
      ) : (
        <ul className="pagination">{renderPageNumbers()}</ul>
      )}
    </div>
  );

}

export default Pagination;