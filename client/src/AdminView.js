import React, {Component} from 'react';
import {Link, Router} from "@reach/router";
import AskQuestion from "./AskQuestion";
import Categories from "./Categories";

export default class Questions extends Component {

    render() {




        return (
            <div className="container">
                <Categories path="/"
                            categories={this.props.categories}
                />
                <br />
                <div className="container">
                    <AskQuestion onAskQuestion={this.props.onAskQuestion}/>
                </div>
            </div>
        )
    };
}