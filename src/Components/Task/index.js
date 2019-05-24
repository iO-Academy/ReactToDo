import React, { Component } from 'react';

export class Task extends Component {

    handleClick = () => {
        if (!this.props.task.completed) {
            this.props.completeToDo(this.props.task._id);
        }
    }

    render() {

        let complete = 'completed'

        if (!this.props.task.completed) {
            complete = ''
        }

        return (
            <li className={complete} onClick={this.handleClick}>
                <div className="view">
                    <label>{this.props.task.todo}</label>
                </div>
            </li>
        )
    }

}