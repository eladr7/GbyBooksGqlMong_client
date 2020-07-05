import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getBookQuery } from './queries/queries';

export const DisplayBookDetails = ({ book }) => {
    if (book) {
        return (
            <div id="book-details">
                <h2>{book.name}</h2>
                <p>{book.genre}</p>
                <p>Author: {book.author.name}</p>
                <p>All books by this author:</p>
                <ul className="other-books">
                    {book.author.books.map(b => (
                        <li key={b.id}>{b.name}</li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div>No book provided</div>
    );
};

const BookDetails = ({ id }) => {
    const { loading, error, data } = useQuery(getBookQuery, { variables: { id } });

    if (loading) return <p>Loading the fucking book...</p>;
    if (error) return <p>Error loading the fucking book :(</p>;

    return DisplayBookDetails(data);
}

export default BookDetails;