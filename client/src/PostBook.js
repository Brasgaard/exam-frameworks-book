import React, {Component} from 'react';
import AskQuestion from "./AskQuestion";
import { Link } from "@reach/router";

export default class PostBook extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('This is a test: ' + this.state.value);
        event.preventDefault();
    }

    render() {

        return (
            <section className="section">
                <h2 className="title is-4">test</h2>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Title:<br/>
                        <input type="text" name="title" /*value={this.state.value}*/ onChange={this.handleChange} />
                    </label>
                    <br/>
                    <label>
                        Author:<br/>
                        <input type="text" name="author" /*value={this.state.value}*/ onChange={this.handleChange} />
                    </label>
                    <br/>
                    <label>
                        Pick category:<br/>
                        <select name="select" /*value={this.state.value}*/ onChange={this.handleChange}>
                            <option value="styling">Styling</option>
                        </select>
                    </label>
                    <br/>
                    <label>
                        Price:<br/>
                        <input type="number" name="price" /*value={this.state.value}*/ onChange={this.handleChange} />
                    </label>
                    <br/>
                    <label>
                        Name of seller:<br/>
                        <input type="text" name="name" /*value={this.state.value}*/ onChange={this.handleChange} />
                    </label>
                    <br/>
                    <input type="submit" value="Submit" />
                </form>

            </section>
        )
    };
}