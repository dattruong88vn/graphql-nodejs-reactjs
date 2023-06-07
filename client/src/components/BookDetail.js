import React, { Component } from 'react';
import { useQuery } from '@apollo/client';
import { getBookByIdQuery } from '../queries/queries';

const BookDetails = ({ id }) => {
    const { loading, error, data } = useQuery(getBookByIdQuery, {
        variables: {
            id
        }
    });

    if (loading) {
        return <div>Loading book detail...</div>
    }

    if (data.book) {
        return (<div id="book-details">
            <h2>{data.book.name}</h2>
            <p>{data.book.genre}</p>
            <p>{data.book.author.name}</p>
            <p>All books by this author:</p>
            <ul className="other-books">
                {data.book.author.books.map(item => {
                    return <li key={item.id}>{item.name}</li>
                })}
            </ul>
        </div>)
    } else {
        return (<div>No book selected...</div>)
    }
}

export default BookDetails;