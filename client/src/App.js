import './App.css';
import BookList from './components/BookList';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import BookListing from './components/BookListing.tsx';

// Apollo Client
const client = new ApolloClient({
   uri: 'http://localhost:4000/graphql',
});

function App() {
   return (
      <ApolloProvider client={client}>
         <div className='App'>
            <BookList />
            <BookListing />
         </div>
      </ApolloProvider>
   );
}

export default App;
