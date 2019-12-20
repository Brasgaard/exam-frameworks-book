import React, {Component} from 'react';
import { Link } from "@reach/router";

export default class Book extends Component {

    render() {
        let books = this.props.books;
        const bookId = this.props.id;

        let book = books.find(x => x._id === bookId)

        return (
            <>
                <p>Title: {book.title}</p>
                <br/>
                <p>Author: {book.author}</p>
                <br/>
                <p>Category: {book.category}</p>
                <br/>
                <p>Price: {book.price}</p>
                <br/>
                <p>Name: {book.name}</p>
                <br/>
            </>
        )
    };
}