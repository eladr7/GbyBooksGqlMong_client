import React, { useState, useContext } from 'react';
import { UserContext } from '../../services/userContext';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { getBooksQuery, buyBookMutation, getUserQuery } from './queries/queries.js';

import BookDetails from './BookDetails';


// const addedUserHasBooksField = boughtBook => 
//   (boughtBook && boughtBook.data && boughtBook.data.buyBook && boughtBook.data.buyBook.boughtBooks);
    // ,
    //     refetchQueries: [{ query: getBooksQuery }, {query: getUserQuery}]
    // if (addedUserHasBooksField(boughtBook)) {
    //     const userFromDB = { id: userAdded.data.buyBook.boughtBooks };
    //     userContext.setUserBooks(userFromDB);
    //   }
const buyTheBook = (email, buyBook, bookid) =>{
    const boughtBook = buyBook({
        variables: {
            email: email,
            book_id: bookid
        }
    });
  }

const BookList = () => {
    const userContext = useContext(UserContext);
    const user = userContext.getUser();

    const { loading, error, data } = useQuery(getBooksQuery);
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [buyBook] = useMutation(buyBookMutation);
    
    if (loading) return <p>Loading the books details</p>;
    if (error) return <p>Error :(</p>;
    if (data.books) {
        return (
            <div>
                <ul id="book-list">
                    {data.books.map(({ name, genre, id, author }) => (
                        <li key={id} onClick={e => { setSelectedBookId(id); }}>
                            <p>Book Suka name: {name}</p>
                            <p>Book Suka genre: {genre}</p>
                            <p>****Book Suka author: {author.name}****</p>
                            <button onClick={() => {buyTheBook(user.email, buyBook, id);}}>Buy this fucking book you cunt: {name}</button>
                            {/* <button onclick={() => buyTheBook(user.email, buyBook, id)}>Buy this fucking book you cunt</button> */}
                        </li>)
                    )}
                </ul>
                <BookDetails id={selectedBookId} />
            </div>
        );
    }

    return (
        <div>No books provided</div>
    );
    // return DisplayBookList(data.books);
}

export default BookList;

// export const DisplayBookList = ({ books }) => {
//     const [selectedBookId, setSelectedBookId] = useState(null);

//     if (books) {
//         return (
//             <div>
//                 <ul id="book-list">
//                     {books.map(({ name, genre, id }) => (
//                         <li key={id} onClick={e => { setSelectedBookId(id); }}>
//                             <p>Book Suka name: {name}</p>
//                             <p>Book Suka genre: {genre}</p>
//                         </li>)
//                     )}
//                 </ul>
//                 <BookDetails id={selectedBookId} />
//             </div>
//         );
//     }

//     return (
//         <div>No books provided</div>
//     );
// };