import React, {Component} from 'react';

class Alert extends Component {
    render() {
        return (
            this.props.msg.length > 0 ?
                <div className="alert">
                    <span className="closebtn" onClick={() => this.resetAlert()}>&times;</span>
                    {this.state.alertMsg}
                </div> : <></>
        );
    }
}

export default Alert;
