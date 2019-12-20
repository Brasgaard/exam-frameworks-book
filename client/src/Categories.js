import React, {Component} from 'react';
import { Link } from "@reach/router";

export default class categories extends Component {

    render() {
        const categoryList = this.props.categories;
        let booksContent =  <>
            {categoryList.map((item, i) => (

                <div>
                    <li>
                        <Link to={"/categories/" + item.title}>
                        {item.title}</Link>
                    </li>
                </div>

            ))}
        </>;

        return (
            booksContent

        )
    };
}