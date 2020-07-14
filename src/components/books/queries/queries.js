import { gql } from 'apollo-boost';


const getBooksQuery = gql`
{
    books {
        name
        genre
        id
        author {
            id
            name
        }
    }
}
`;

const getBookQuery = gql`
    query($id: ID) {
        book(id: $id) {
            id
            name
            genre
            author {
                id
                name
                age
                books {
                    name
                    id
                }
            }
        }
    }
`;

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;

const getUserQuery = gql`
    query($email: String!) {
        user(email: $email) {
            id
            name
            email
            books {
                id
                name
                genre
            }
        }
    }
`;

const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`;

const addUserMutation = gql`
    mutation($name: String!, $email: String!) {
        addUser(name: $name, email: $email){
            name
            email
            id
        }
    }
`;

const buyBookMutation = gql`
    mutation($email: String!, $book_id: ID!) {
        buyBook(email: $email, book_id: $book_id){
            name
            email
            books {
                id
                name
                genre
            }
        }
    }
`;

export { getAuthorsQuery, getUserQuery, getBooksQuery, addBookMutation, getBookQuery, addUserMutation, buyBookMutation };