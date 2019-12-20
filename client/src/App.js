import React, {Component} from 'react';
import {Link, Router} from "@reach/router";
import {connect} from "react-redux";
import { login, logout, loadBooks, loadCategories, postAnswer, voteAnswerUp, hideAlert } from './actions';
import Books from "./Books";
import Categories from "./Categories";
import Book from "./Book";
import Login from "./Login";
import Alert from "./Alert";
import UserHeader from "./UserHeader";
import AdminView from "./AdminView";
import PostBook from "./PostBook";
import AskQuestion from "./AskQuestion";



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertMsg: ""
        };
    }

    componentDidMount() {
        this.props.loadBooks();
        this.props.loadCategories();
    }

    resetAlert() {
        this.setState({
            alertMsg: "",
            suppressInfo: true
        })
    }


    render() {
        let notification = <></>;
        if (this.props.notifications.active) {
            const notif = this.props.notifications;
            const level = notif.level === "error" ? "is-danger" : "is-warning";

            notification = <section className={`hero ${level} is-small`}>
                <div className="hero-body">
                    <div className="container">
                        <button onClick={() => this.props.hideAlert()} className="delete is-large is-pulled-right" />
                        <h1 className="title">
                            {notif.title}
                        </h1>
                        <h2 className="subtitle">
                            {notif.text}
                        </h2>
                    </div>
                </div>
            </section>
        }

        return (
            <>
                {notification}

                <section className="hero is-primary">
                    <div className="hero-body">
                        <div className="container" >
                            <Link to="/"><h1 className="title is-2">BOOK MARKETPLACE</h1></Link>
                            <h2 className="subtitle">
                                For students, by students.
                            </h2>
                        </div>
                    </div>
                </section>

                <UserHeader username={this.props.user.username} logout={_ => this.props.logout()}/>

                <section className="section">
                    <Alert msg={this.state.alertMsg}/>

                    <Router>
                        <Books path="/categories/:category"
                               books={this.props.books}
                        />
                        <Categories path="/"
                                    categories={this.props.categories}
                        />

                        <Book path="/book/:id"
                              books={this.props.books}
                        />

                        <Login path="/login"
                            login={(username, password) => this.props.login(username, password)}
                            infoMsg={this.state.infoMsg}
                        />

                        <AdminView path="/AdminView"
                                   categories={this.props.categories}
                                   onAskQuestion={(text) => this.props.postQuestion(text)} />

                        <PostBook path="/PostBook"/>

                        <AskQuestion path ="/AskQuestion"/>
                    </Router>

                </section>

                <footer className="footer">
                    <div className="container">
                        <div className="content has-text-centered">
                            <p>
                                <strong style={{ color: '#ffffff' }}>BOOK MARKETPLACE</strong> by EAAA Students
                            </p>
                        </div>
                    </div>
                </footer>
            </>
        );
    }
}

const mapStateToProps = state => ({
    books: state.books,
    user: state.user,
    categories: state.categories,
    notifications: state.notifications
});

const mapDispatchToProps = dispatch => ({
    loadBooks: _ => dispatch(loadBooks()),
    loadCategories: _ => dispatch(loadCategories()),

    postAnswer: (id, text) => dispatch(postAnswer(id, text)),
    login: (username, password) => dispatch(login(username, password)),
    logout: _ => dispatch(logout()),
    voteAnswerUp: (questionId, answerId) => dispatch(voteAnswerUp(questionId, answerId)),
    hideAlert: _ => dispatch(hideAlert())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

