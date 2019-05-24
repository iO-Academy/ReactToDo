import React, { Component } from 'react';

export class AddToDo extends Component {
    render() {
        return (
            <input className="new-todo" onKeyDown={this.props.createToDo} placeholder="What needs to be done?" autoFocus />
        )
    }
}