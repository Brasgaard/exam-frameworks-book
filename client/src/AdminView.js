import React, {Component} from 'react';
import { Link } from "@reach/router";
import AskQuestion from "./AskQuestion";

export default class Questions extends Component {

    render() {
        if (!this.props.questions) return <p>Loading...</p>;

        let trList = this.props.questions.map(elm =>
            <li key={elm._id}>
                <div className="columns">
                    <div className="column"><Link className="list-item" to={"/question/" + elm._id}>{elm.text}</Link></div>
                    <div className="column is-one-fifth">
                        <button className="button is-small">Remove</button>
                    </div>
                </div>
            </li>
        );

        return (
            <div className="container">
                <h2 className="title is-4">Current categories</h2>
                <br /><br />
                <ul className="has-background-white-bis">
                    {trList}
                </ul>
                <br />
                <div className="container">
                    <AskQuestion onAskQuestion={this.props.onAskQuestion}/>
                </div>
            </div>
        )
    };
}