import React, {Component} from 'react';
import { Link } from "@reach/router";

export default class Questions extends Component {

    render() {
        if (!this.props.questions) return <p>Loading...</p>;

        let trList = this.props.questions.map(elm =>
            <li key={elm._id}><Link className="list-item" to={"/question/" + elm._id}>{elm.text}</Link></li>
        );

        return (
            <div className="container">
                <h2 className="title is-4">Pick a category</h2>

                <Link to="/QuestionsSingle">Book Page test</Link>
                <br /><br />
                <ul className="has-background-white-bis">
                    {trList}
                </ul>
            </div>
        )
    };
}