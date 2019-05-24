import React, { Component } from 'react';
import {Task} from "../Task";

export class CompletedList extends Component {
    constructor(props) {
        super(props);
        this.state = {tasks: []}
    }

    componentWillReceiveProps(props) {
        this.setState({ tasks: props.tasks });
    }

    render() {
        return (
            <ul className="todo-list">
                {this.displayTasks(this.state.tasks)}
            </ul>
        )
    }

    displayTasks = (tasks) => {
        let output = [];
        if (typeof tasks != 'undefined' && tasks.length > 0) {
            tasks.forEach((task, i) => {
                output.push(
                    <Task key={i} task={task} />
                )
            })
        }
        return output
    }

}