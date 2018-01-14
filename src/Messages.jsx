import React from 'react';
import { connect } from 'react-redux';
import { say } from './redux/index';
import './Messages.css';

class Messages extends React.Component {
    render() {
        const { messages, say } = this.props;
        return (
            <div className="Messages">
                <ul className="Messages--list">
                    { messages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    say(this.messageInput.value);
                    this.messageInput.value = '';
                }}>
                    <input type="text" ref={ref => this.messageInput = ref}/>
                    <button>Say</button>
                </form>
            </div>
        );
    }
}

Messages.defaultProps = {
};

const mapStateToProps = (state) => ({
    messages: state.shared.messages,
});

const mapDispatchToProps = {
    say,
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);