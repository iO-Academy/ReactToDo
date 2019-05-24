import React, { Component } from 'react';
import {UncompletedList} from "../UncompletedList";
import {CompletedList} from "../CompletedList";
import {AddToDo} from "../AddToDo";
import './ToDoApp.css';

export class ToDoApp extends Component {

    constructor(props) {
        super(props);

        this.state = {uncompletedTasks: []}

        this.getToDos();
    }

    getToDos = () => {
        fetch('http://localhost:3000/todos')
            .then(response => response.json())
            .then(data => {
                this.sortToDos(data);
            })
    }

    sortToDos = (todos) => {
        let uncompleted = []
        let completed = []
        todos.forEach(todo => {
            if (todo.completed) {
                completed.push(todo)
            } else {
                uncompleted.push(todo)
            }
        })
        this.setState({'uncompletedTasks': uncompleted, 'completedTasks': completed});
    }

    completeToDo = (id) => {
        fetch('http://localhost:3000/todos/' + id, {
            method: 'PUT',
            headers: {
                'Access-Control-Request-Method': 'PUT'
            }
        }).then(response => response.json())
            .then(data => {
                this.removeToDo(id)
            })
    }

    removeToDo = (id) => {
        let uncompleted = []
        let completed = this.state.completedTasks
        this.state.uncompletedTasks.forEach(task => {
            if (task._id == id) {
                task.completed = true;
                completed.push(task)
            } else {
                uncompleted.push(task)
            }
        })
        this.setState({'uncompletedTasks': uncompleted, 'completedTasks': completed});

    }

    createToDo = (e) => {
        if (e.key === 'Enter') {
            const value = e.target.value
            e.target.value = ''
            fetch('http://localhost:3000/todos', {
                method: 'POST',
                body: JSON.stringify({todo: value}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
                .then(response => {
                    console.log(response.success)
                    if (response.success) {
                        let uncompleted = this.state.uncompletedTasks;
                        uncompleted.push({todo: value});
                        this.setState({'uncompletedTasks': uncompleted});
                    }
                })
        }
    }

    render() {

        return (
            <section className="todoapp">
                <header className="header">
                    <h1>Todos</h1>
                    <AddToDo createToDo={this.createToDo} />
                </header>
                <section className="main">
                    <UncompletedList completeToDo={this.completeToDo} tasks={this.state.uncompletedTasks} />
                    <CompletedList tasks={this.state.completedTasks} />
                </section>
            </section>
        )
    }

}