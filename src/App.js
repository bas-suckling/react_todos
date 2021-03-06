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
        return b.points - a.points
      });
      return array
    }
  };

  parseInput = (task) => {
    return task
  }


  handleSubmit = event => {
    event.preventDefault();

    // this.state.points = this.parseInput(this.state.newTask)
    
    if (!this.state.points) {
      this.state.points = 1
    }

    const newTasks = [
      ...this.state.tasks,
      { name: this.state.newTask,
        points : this.state.points }
    ];

    this.setState({ tasks: this.sortTasks(newTasks), newTask: '', points: '' });
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
            id="points"
            label="Point Value"
            value={this.state.points}
            onChange={this.handleChange('points')}
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
                    <ListItemText primary={task.name} className={task.points >= 10 ? 'critical' :' normal'}/>
                    <ListItemText secondary={task.points} />
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
