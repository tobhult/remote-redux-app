import React, { Component } from 'react';
import Messages from './Messages';
import Adder from './Adder';

import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App--header">
                    <h1 className="App--title">Mixed local and shared model</h1>
                </header>
                <div className="App--content">
                    <div className="App--content-item">
                        <p className="App--content-item-header">Add</p>
                        <Adder />
                    </div>
                    <div className="App--content-item">
                        <p className="App--content-item-header">Messages</p>
                        <Messages />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
