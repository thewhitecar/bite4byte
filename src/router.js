import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './Components/login/login'
import Dashboard from './Components/dashboardLanding/dashboardLanding'
import OrderForm from './Components/orderForm/orderForm'
import AddInventory from './Components/addInventoryForm/addInventoryForm'

export default (

    <Switch>
         <Route component={Login} exact path="/"/>
         <Route component={Dashboard} exact path='/home'/>
         <Route component={OrderForm} exact path='/order'/>
         <Route component={AddInventory} exact path='/add'/>
    </Switch>


  )


 