import React, { Component } from 'react';

class TodoApp extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      newTask: ''
    };
  }

  componentDidMount() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.setState({ tasks: JSON.parse(storedTasks) });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  }

  handleInputChange = (e) => {
    this.setState({ newTask: e.target.value });
  }

  addTask = () => {
    if (this.state.newTask.trim() !== '') {
      this.setState({
        tasks: [...this.state.tasks, this.state.newTask],
        newTask: ''
      });
    }
  }

  deleteTask = (index) => {
    const updatedTasks = this.state.tasks.filter((_, i) => i !== index);
    this.setState({ tasks: updatedTasks });
  }

  render() {
    return (
      <div className="container">
        <h1 className="title">To-Do App</h1>
        <div>
          <input
            type="text"
            value={this.state.newTask}
            onChange={this.handleInputChange}
            placeholder="Add a new task"
            className="input-field"
          />
          <button onClick={this.addTask} className="add-button">
            Add Task
          </button>
        </div>
        <ul className="task-list">
          {this.state.tasks.map((task, index) => (
            <li key={index} className="task-item">
              {task}
              <button
                onClick={() => this.deleteTask(index)}
                className="delete-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoApp;
