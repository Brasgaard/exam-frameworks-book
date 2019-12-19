import React, {Component} from 'react';

export default class PostAnswer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            answer: ""
        };
        this.handleInput = this.handleInput.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleInput(event) {
        event.preventDefault();
        this.props.onPostAnswer(this.props.question._id, this.state.answer);
        this.setState({answer: ""})
    }

    onChange(event) {
        this.setState({
            answer: event.target.value
        });
    }

    render() {
        return (
            <form>
                <div className="field">
                    <label className="label" htmlFor="AnswerInput">Your answer</label>
                    <div className="control">
                        <textarea className="textarea" onChange={this.onChange}
                               value={this.state.question}
                               placeholder="Answer"
                               id="AnswerInput"/>
                    </div>
                </div>
                <div className="field">
                    <button className="button is-primary" onClick={this.handleInput} type="submit"
                            id="AnswerButton">Give answer
                    </button>
                </div>
            </form>
        )
    };
}