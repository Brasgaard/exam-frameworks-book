import React, {Component} from 'react';
import {Link} from "@reach/router";

class UserHeader extends Component {
    render() {
        const writeLoginStatus = () => {
            if (this.props.username) {
                return (
                    <>
                        Welcome {this.props.username}.
                        <br /><button className="button is-small" onClick={
                            (event) => this.props.logout(event)}>Logout</button><br />
                        <Link to="/AdminView">Admin</Link>
                    </>)
            } else {
                return <Link to="/login" className="btnText">Login</Link>
            }
        };

        return (
            <div className="container is-widescreen">
                <div className="notification">
                    <ul style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
                        <li>{writeLoginStatus()}</li>
                        <li><Link to="/PostBook">Post a book</Link></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default UserHeader;
