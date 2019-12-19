import React, {Component} from 'react';
import { Link } from "@reach/router";

export default class Book extends Component {

    render() {
        let books = this.props.books;
        const bookId = this.props.id;

        let book = books.find(x => x._id === bookId)

        return (
            <>
                {book.title}
                <br/>
                {book.author}
                <br/>
                {book.category}
                <br/>
                {book.price}
                <br/>
                {book.name}
                <br/>
            </>
        )
    };
}