import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getBooksQuery } from './queries/queries';

import BookDetails from './BookDetails';

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

const BookList = () => {
    const { loading, error, data } = useQuery(getBooksQuery);
    const [selectedBookId, setSelectedBookId] = useState(null);

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
                            <p>Book Suka author: {author.name}</p>
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