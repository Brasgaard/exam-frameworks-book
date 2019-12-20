import React, {Component} from 'react';
import { Link } from "@reach/router";

export default class Books extends Component {

    render() {
        let bookList = this.props.books;
        let category = this.props.category;

        var newArray = bookList.filter(function (book) {
            return book.category === category
        });
        console.log(category)

        let booksContent =  <>
            {newArray.map((item, i) => (
                <li>
                    <Link to={"/book/" + item._id}>
                        {item.title} by {item.author}</Link>
                </li>

            ))}
        </>;

        return (
            booksContent

        )
    };
}