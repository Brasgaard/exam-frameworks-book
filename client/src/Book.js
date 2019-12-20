import React, {Component} from 'react';

export default class Book extends Component {

    render() {
        let books = this.props.books;
        const bookId = this.props.id;

        let book = books.find(x => x._id === bookId)

        return (
            <>
                <p><strong>Title:</strong> {book.title}</p>
                <br/>
                <p><strong>Author:</strong> {book.author}</p>
                <br/>
                <p><strong>Category:</strong> {book.category}</p>
                <br/>
                <p><strong>Price:</strong> {book.price}</p>
                <br/>
                <p><strong>Name:</strong> {book.name}</p>
            </>
        )
    };
}