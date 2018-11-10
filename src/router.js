import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './components/login/login.js'
import Dashboard from './components/dashboardLanding/dashboardLanding.js'
import OrderForm from './components/orderForm/orderForm.js'
import AddInventory from './components/addInventoryForm/addInventoryForm.js'

export default (

    <Switch>
         <Route component={Login} exact path='/'/>
         <Route component={Dashboard} exact path='/home'/>
         <Route component={OrderForm} exact path='/order'/>
         <Route component={AddInventory} exact path='/add'/>
    </Switch>

  )