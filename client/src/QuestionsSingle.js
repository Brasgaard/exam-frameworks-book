import React, { Component } from 'react';

export default class QuestionsSingle extends Component {
    render() {


        const categories = this.props.questions;
        console.log(categories);

        let questions = [];
        for (let i = 0; i < categories.length; i++) {
            questions.push(categories[i].answers);
        }

        let array = [];
        for (let i = 0; i < questions.length; i++) {
            array = [...array, ...questions[i]]
        }


        let newQuestion = array.find(x => x._id === this.props.id);
        console.log(this.props.id);
        console.log(newQuestion);

        // Prints the book as objects
        let printQuestion;
        if(newQuestion) {
            printQuestion = (
                <div>
                    <p>Title: <span>{newQuestion.text}</span></p>
                </div>
            )
        }

        return (
            <>
                <div className="container">
                    <h2 className="title is-4 list-item">Book Info</h2>
                    <ul>
                        {printQuestion ? printQuestion : <p>Loading books..</p>}
                    </ul>

                </div>

            </>
        )
    };

}