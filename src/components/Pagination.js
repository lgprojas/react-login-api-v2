import React from 'react'

function Pagination({ registrosPerPage, totalRegistros, paginate }) {
    
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalRegistros / registrosPerPage); i++){
        pageNumbers.push(i);
    }

  return (
    <nav className='text-center'>
        <ul className='pagination mt-2'>
        {pageNumbers.map(number => (
            <li key={number} className='page-item'>
                <a onClick={() => paginate(number)} href='#' className='page-link'>
                    {number}
                </a>
            </li>
        ))}
        </ul>
    </nav>
  )
}

export default Pagination