import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from './components/layouts/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// can cai cac packege sau
class  App extends Component {
  render(){
    return (
      <div className="App">
        <Header />

        <BrowserRouter>
          <Route path="/register" exact component={Register} />
          {/* <Router path="/login" exact component={Login} /> */}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
