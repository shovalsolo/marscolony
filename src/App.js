import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'; 
import $ from 'jquery';

var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;


class App extends Component {


 constructor(props){
    super(props);
    this.state =({fact:"loading", encounters: []});
   
  }

    componentDidMount(){
    axios.get('https://red-wdp-api.herokuapp.com/api/mars/encounters')
    .then((response) => {
    let data = response.data.encounters;
    this.setState({encounters: data});

  })

  .catch(function (error) {
    console.log(error);
  });
  }

  render(){
    let encounters = this.state.encounters;
    let mappedEncounters = encounters.map(encounter => 
    <div class="getEncounter">
      <p> {"(Date :) "+encounter.date 
       +"  (ID :) "+ encounter.id  
       + " (Atype :) "+ encounter.atype 
       + " (Action :) "+ encounter.action } </p>
     </div>
    
    );
    return (

      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          {mappedEncounters}
        </p>
        <Fact fact={this.state.fact} />
        <CheckIn />
       
      </div>
    );
  }
}


class Fact extends Component {
  constructor(props){
    super(props);
    
  }
  render(){
    return(
    <div>
        <div> {this.props.fact} </div>
    </div>
    );
  }

}


//---------------form and input------------------------------

class CheckIn extends Component {
  constructor(props) {
    super(props);
    this.state = {namevalue: '',agevalue: '',jobvalue: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) { //event handler that is called from text field on each click
  
    let  theKey = event.target.name + "value";
    let value = event.target.value;

    console.log(theKey, value);
    this.setState({[theKey] : value }); //will re-render the box evey time because using setState
  }

  handleSubmit(event) { //event handler that is called when the form is submited
    alert('A name was submitted: ' + this.state.namevalue);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
        <p>{this.state.namevalue}</p>
          Name:
          <input name="name" type="text" value={this.state.namevalue} onChange={this.handleChange} />
        </label>
        <label>
          Age:
          <input name="age" type="text" value={this.state.agevalue} onChange={this.handleChange} />
        </label>
        <label>
          Job:
          <input name="job" type="text" value={this.state.jobvalue} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}


export default App;
