import { graphql } from 'react-apollo';
import React from 'react';
import { getBookQuery } from '../queries/queries';

function BookDetails(props) {
   const displayBookDetails = () => {
      const { book } = props.data;
      console.log(book);
      if (book) {
         return (
            <div>
               <p>{book.name}</p>
               <p>{book.genre}</p>
               <p>{book.author.name}</p>
               <h2>inne tego autora</h2>
               <ul>
                  {book.author.books.map(book => {
                     return <div key={book.id}>{book.name}</div>;
                  })}
               </ul>
            </div>
         );
      }
   };

   return (
      <div id='book-details'>
         <p>Output book details here: {props.bookId}</p>
         {displayBookDetails()}
      </div>
   );
}

export default graphql(getBookQuery, {
   options: props => {
      return {
         variables: {
            id: props.bookId,
         },
      };
   },
})(BookDetails);
