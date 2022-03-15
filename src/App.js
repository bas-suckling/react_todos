import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import './App.css';

export default class App extends Component {
  state = Object.assign({
      newTask: '',
      tasks: []
  }, this.props.initialState);

  componentWillUpdate = this.props.onState || undefined;

  handleChange = key => event => {
    this.setState({ [key]: event.target.value });
  };

  sortTasks = (array) => {
    if (array.length > 0) {
      array.sort(function (a, b) {
        return b.pointValue - a.pointValue
      });
      return array
    }
  };

  parseInput = (task) => {
    return task
  }


  handleSubmit = event => {
    event.preventDefault();

    // this.state.pointValue = this.parseInput(this.state.newTask)
    
    if (!this.state.pointValue) {
      this.state.pointValue = 1
    }

    const newTasks = [
      ...this.state.tasks,
      { name: this.state.newTask,
        pointValue : this.state.pointValue }
    ];

    this.setState({ tasks: this.sortTasks(newTasks), newTask: '', pointValue: '' });
  };

  deleteItem = index => event => {
    const newTasks = [...this.state.tasks];
    newTasks.splice(index, 1);
    this.setState({
      tasks: newTasks,
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">TODO</h1>
        </header>
        <form onSubmit={this.handleSubmit} id="addtask">
          <TextField
            id="newTask"
            label="Name"
            value={this.state.newTask}
            onChange={this.handleChange('newTask')}
          />
          <TextField
            id="pointValue"
            label="Point Value"
            value={this.state.pointValue}
            onChange={this.handleChange('pointValue')}
          />
          <Button type="submit" aria-label="Add" color="primary">
            <AddIcon /> Add
          </Button>
        </form>
        <Grid container spacing={16}>
          <Grid item xs={3}>
          </Grid>
          <Grid item xs={6}>
            <List component="nav">
              {this.state.tasks.map((task, i) =>
                <div key={i} >
                  <ListItem button>
                    <ListItemText primary={task.name} className={task.pointValue >= 10 ? 'critical' :' normal'}/>
                    <ListItemText secondary={task.pointValue} />
                    <ListItemSecondaryAction>
                      <IconButton
                        aria-label="Delete"
                        onClick={this.deleteItem(i)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </div>
              )}
            </List>
          </Grid>
        </Grid>
      </div>
    );
  }
}
