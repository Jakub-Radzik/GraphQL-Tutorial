import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

function BookList(props) {
   const [selected, setSelected] = useState(null);
   const heading = <h1>Books Listing</h1>;

   const displayBooks = () => {
      var data = props.data;
      if (data.loading) {
         return <div>Loading books...</div>;
      } else {
         return data.books.map(book => {
            return (
               <li key={book.id} onClick={() => setSelected(book.id)}>
                  {book.name}
               </li>
            );
         });
      }
   };

   return (
      <div>
         {heading}
         <ul id='book-list'>{displayBooks()}</ul>
         {selected && <BookDetails bookId={selected} />}
      </div>
   );
}

export default graphql(getBooksQuery)(BookList);
