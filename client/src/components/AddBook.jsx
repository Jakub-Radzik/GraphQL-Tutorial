import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';
import { flowRight as compose } from 'lodash';

function AddBook(props) {
   const initialState = {
      name: '',
      genre: '',
      authorId: '',
   };

   const [author, setAuthor] = useState(initialState);

   const displayAuthors = () => {
      console.log(props);
      var data = props.getAuthorsQuery;
      if (data.loading) {
         return <option disabled>Loading Authors...</option>;
      } else {
         return data.authors.map(author => {
            return (
               <option key={author.id} value={author.id}>
                  {author.name}
               </option>
            );
         });
      }
   };

   const submitForm = e => {
      e.preventDefault();
      props.addBookMutation({
         variables: {
            name: author.name,
            genre: author.genre,
            authorId: author.authorId,
         },
         refetchQueries: [{ query: getBooksQuery }],
      });
   };

   return (
      <form id='add-book' onSubmit={e => submitForm(e)}>
         <div className='field'>
            <label>Book name:</label>
            <input
               type='text'
               onChange={e => {
                  setAuthor({ ...author, name: e.target.value });
               }}
            />
         </div>

         <div className='field'>
            <label>Genre:</label>
            <input
               type='text'
               onChange={e => {
                  setAuthor({ ...author, genre: e.target.value });
               }}
            />
         </div>

         <div className='field'>
            <label>Author:</label>
            <select
               onChange={e => {
                  setAuthor({ ...author, authorId: e.target.value });
               }}
            >
               <option>Select Author</option>
               {displayAuthors()}
            </select>
         </div>

         <button>+</button>
      </form>
   );
}
export default compose(
   graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
   graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
