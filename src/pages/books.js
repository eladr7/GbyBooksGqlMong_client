import React, { useState } from "react"
// import ApolloClient from 'apollo-boost';
// import { ApolloProvider } from '@apollo/react-hooks';

import BookList from '../components/books/BookList';
import AddBook from '../components/books/AddBook';
import Layout from "../components/layout"

// const client = new ApolloClient({
//   uri: 'https://gatsby-server-ugdhobbyma-uw.a.run.app/graphql'
// });

const Books = () => {
  return (
    <Layout>
      {/* <ApolloProvider client={client}> */}
        <div id="main">
          <h1>Suka GraphQL app you blat suka!</h1>
          <BookList />
          <AddBook />
        </div>
      {/* </ApolloProvider> */}
    </Layout>
  );
}

export default Books;