import React, {Component} from 'react';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };
    }

    async handleInput(event) {
        event.preventDefault();
        await this.props.login(this.state.username, this.state.password);
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <div className="columns is-centered">
                <div className="column is-half">
                <form>
                    <div className="field">
                        <label className="label" htmlFor="Username">Username</label>
                        <input className="input" onChange={event => this.onChange(event)}
                               type="text"
                               placeholder="Username"
                               name="username"/>
                        <br/>
                        <label className="label" htmlFor="Password">Password</label>
                        <input className="input" onChange={event => this.onChange(event)}
                               type="password"
                               placeholder="Password"
                               name="password"/>
                        <br/>
                        <br/>
                        <button className="button is-primary"
                                onClick={event => this.handleInput(event)}
                                type="submit"
                                id="Login">Login
                        </button>
                    </div>
                </form>
            </div>
            </div>
        )
    };
}