import React, { Component } from "react";
import { connect } from "react-redux";
import { simpleAction } from "./actions/actions";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {

  simpleAction = (event) => {
    this.props.simpleAction();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button onClick={this.simpleAction}>Test redux action</button>
          <pre>
            {
              JSON.stringify(this.props)
            }
          </pre>
        </header>
      </div>
    );
  }
}

// mapStateToProps allows the React component to subscribe to redux state updates.
const mapStateToProps = state => ({
  ...state
});

// The mapDispatchToProps parameter of connect can either be:
//    - an object of action creators wrapped into a dispatch.
//    - a function with a dispatch parameter. The function should return an object that uses 
//      dispatch to bind action creators. Alternatively, you can use the bindActionCreators() helper 
//      from redux

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
