import React, {Component} from 'react';
import { Link } from "@reach/router";

export default class Question extends Component {

    render() {
        const question = this.props.getQuestion(this.props.id);
        let answerContent = <p>loading...</p>;

        if (question) {
            answerContent = question.answers ?
                question.answers.map(
                    ans =>
                        <li key={ans._id}>
                            <div key={ans._id} className="columns">
                                <div className="column"><Link  className="list-item" to={"/QuestionsSingle"}>{ans.text}</Link></div>
                                <div className="column is-one-fifth">
                                    <button className="button is-small" onClick={
                                        () => this.props.handleVote(question._id, ans._id)}>Vote Up
                                    </button>
                                    <span className="is-outlined">  {ans.votes}</span>
                                </div>
                            </div>
                        </li>
                ) : [];
        }

        return (
            <>
                <div className="container">
                <section className="section">
                    {question ? <h3>{question.text}</h3> : <p>"loading text..."</p>}
                </section>

                <section className="section has-background-white-bis">
                    <ul>
                        {answerContent}
                    </ul>
                </section>
                </div>
            </>
        )
    };
}