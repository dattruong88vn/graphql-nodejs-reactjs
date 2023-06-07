import React, { useState } from 'react';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';
import { useQuery, useMutation, refetchQueries } from '@apollo/client';

const AddBook = () => {
    const { loading: authorLoading, data } = useQuery(getAuthorsQuery);
    const [addBook, { loading: addBookLoading, data: addBookData }] = useMutation(addBookMutation, { refetchQueries: [getBooksQuery, 'getBooks'] });

    async function handleSubmit(e) {
        e.preventDefault();
        const postData = {
            name: e.target.name.value,
            genre: e.target.genre.value,
            authorId: e.target.authorId.value,
        }
        addBook({
            variables: { ...postData },
        })
    }

    if (authorLoading) {
        return (<option disabled>Loading authors</option>);
    }

    return (
        <form id="add-book" onSubmit={handleSubmit}>
            <div className="field">
                <label>Book name:</label>
                <input type="text" name="name" />
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" name="genre" />
            </div>
            <div className="field">
                <label>Author:</label>
                <select name='authorId'>
                    <option>Select author</option>
                    {data.authors.map(author => {
                        return (<option key={author.id} value={author.id}>{author.name}</option>);
                    })}
                </select>
            </div>
            <button type='submit'>+</button>

        </form>
    );
}

export default AddBook;