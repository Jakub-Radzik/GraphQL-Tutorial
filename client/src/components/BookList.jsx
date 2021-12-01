import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
   {
      books {
         id
         name
         genre
      }
   }
`;

function BookList(props) {
   const { data } = props;

   const heading = <h1>Books Listing</h1>;

   return (
      <div>
         {heading}
         <ul id='book-list'>
            {data.books &&
               data.books.map(book => {
                  return (
                     <li key={book.id} style={{ border: '1px solid black' }}>
                        <p>{book.id}</p>
                        <strong>{book.name}</strong>
                        <p>{book.genre}</p>
                     </li>
                  );
               })}
         </ul>
      </div>
   );
}

export default graphql(getBooksQuery)(BookList);
