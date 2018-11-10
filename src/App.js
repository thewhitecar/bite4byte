import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './Components/Login/login'
import Dashboard from './Components/dashboardLanding/dashboardLanding'
import OrderForm from './Components/orderForm/orderForm'
import AddInventory from './Components/addInventoryForm/addInventoryForm'
import AuthCheck from './Components/AuthCheck'


class App extends Component {


  render() {
    return (
      <div className="App">
      <AuthCheck>
        <Switch>
          <Route component={Login} exact path='/'/>
          <Route component={Dashboard} exact path='/home'/>
          <Route component={OrderForm} exact path='/order'/>
          <Route component={AddInventory} exact path='/add'/>
        </Switch>
      </AuthCheck>
      </div>
    )
  }
}

export default App;