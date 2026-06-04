import React, { createContext, useState } from 'react';
import { LLIBRES } from '../books';

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState(LLIBRES);

  const updateBookStatus = (id, newStatus) => {
    setBooks(prevBooks =>
      prevBooks.map(book =>
        String(book.id) === String(id) ? { ...book, status: newStatus } : book
      )
    );
  };

  const deleteBook = (id) => {
    setBooks(prevBooks => prevBooks.filter(book => String(book.id) !== String(id)));
  };

  return (
    // Afegeix deleteBook als valors que exportem
    <BooksContext.Provider value={{ books, updateBookStatus, deleteBook }}>
      {children}
    </BooksContext.Provider>
  );
};