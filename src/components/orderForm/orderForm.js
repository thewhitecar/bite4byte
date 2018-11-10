import React, { Component } from "react"
import axios from "axios";
import './orderForm.css'
const plus = require('../../images/plus.png')

export default class OrderForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
          inventory: null,
          cartItems: []
      };
    }

//currently id 1 for testing purposes

    componentDidMount(){
        axios.get('/api/inventory/1').then(results => {
            this.setState({
                inventory: results.data.inventory
            })
            console.log(this.state.inventory)
        })
    }

    // addItems(itemID, quantity){

    // }



    render(){
        let inventoryList;
        if(this.state.inventory){inventoryList = this.state.inventory.map( pantryItem => {
            return(
            <div className="pantry-item-container">
                <li>{pantryItem.item_name}</li>
                <h3>Quantity: {pantryItem.quantity}</h3>
                <img src={plus}/>
            </div>
                )
        })
    }

        return(
            <div className="dash-window">
                <h1 style={{marginBottom: "50px"}}>Create Order</h1>
                <div className="order-form-container">
                    <div id="left-side">
                        <div>
                            <p>Current Inventory</p>
                        </div>
                        <ul>
                            {inventoryList}
                        </ul>
                    </div>
                    <div id="right-side">
                        <p>Order Cart</p>
                    </div>
                </div>

            </div>
        )
    }
}