import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetail';

const BookList = () => {
    const { loading, error, data } = useQuery(getBooksQuery);
    const [selectedId, setSelectedId] = useState(null)

    if (loading) {
        return <div>Loading books...</div>
    }

    return (
        <div>
            <ul id="book-list">
                {data.books.map(book => (
                    <li key={book.id} onClick={() => setSelectedId(book.id)}>{book.name}</li>
                ))}
            </ul>
            {selectedId && (
                <BookDetails id={selectedId} />
            )}
        </div>
    );
}

export default BookList;