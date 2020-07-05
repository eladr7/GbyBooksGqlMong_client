import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from './queries/queries';


// const AddBookForm = ({ data }) => {
    // const [name, setName] = useState('');
    // const [genre, setGenre] = useState('');
    // const [authorId, setAuthorId] = useState('');

    // const [addBook, { mutationData }] = useMutation(addBookMutation);

    // const addBookToAuthor = e => {
    //     e.preventDefault();

    //     addBook({
    //         variables: {
    //             name: name,
    //             genre: genre,
    //             authorId: authorId
    //         },
    //         refetchQueries: [{ query: getBooksQuery }]
    //     });

    //     setName('');
    //     setGenre('');
    //     setAuthorId('');
    // };

    // return (
    //     <form id="add-book" onSubmit={addBookToAuthor}>
    //         <div className="field">
    //             <label>Book name:</label>
    //             <input type="text" required value={name} onChange={e => setName(e.target.value)} />
    //         </div>

    //         <div className="field">
    //             <label>Genre:</label>
    //             <input type="text" required value={genre} onChange={e => setGenre(e.target.value)} />
    //         </div>

    //         <div className="field">
    //             <label>Author:</label>
    //             <select onChange={e => setAuthorId(e.target.value)} value={authorId}>
    //                 <option value=''>Select author</option>
    //                 {data.authors.map(({ name, id }) => (
    //                     <option key={id} value={id}>{name}</option>)
    //                 )}
    //             </select>
    //         </div>

    //         <button>+</button>
    //     </form>
    // );
// }

const AddBook = () => {
    const { loading, error, data } = useQuery(getAuthorsQuery);
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');

    const [addBook, { mutationData }] = useMutation(addBookMutation);

    if (loading) return <p>Loading authors...</p>;
    if (error) return <p>Error while the authors query</p>;

    const addBookToAuthor = e => {
        e.preventDefault();

        addBook({
            variables: {
                name: name,
                genre: genre,
                authorId: authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        });

        setName('');
        setGenre('');
        setAuthorId('');
    };

    return (
        <form id="add-book" onSubmit={addBookToAuthor}>
            <div className="field">
                <label>Book name:</label>
                <input type="text" required value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div className="field">
                <label>Genre:</label>
                <input type="text" required value={genre} onChange={e => setGenre(e.target.value)} />
            </div>

            <div className="field">
                <label>Author:</label>
                <select onChange={e => setAuthorId(e.target.value)} value={authorId}>
                    <option value=''>Select author</option>
                    {data.authors.map(({ name, id }) => (
                        <option key={id} value={id}>{name}</option>)
                    )}
                </select>
            </div>

            <button>+</button>
        </form>
    );

    // return AddBookForm(data);
}

export default AddBook;