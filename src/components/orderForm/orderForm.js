import React, { Component } from "react"
import {Link} from 'react-router-dom'
import axios from "axios";
import './orderForm.css'
import { connect } from "react-redux";
import OrderFormItem from '../OrderFormItem'

class OrderForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
          inventory: [],
          cartItems: []
      };
    }


    componentDidUpdate(prevProps) {
        if(prevProps.user.id !== this.props.user.id) {
            axios.get(`/api/inventory/${this.props.user.pantry_id}`).then(results => {
                let inventory = results.data.inventory.map( item => {return {...item, orderCount: 0}})
                this.setState({
                    inventory
                })
            })
        }
    }

    updateItemCount = (itemPantryLinkId, newCount) => {
        let newInventory = this.state.inventory.map(inventory => {
            if(inventory.item_pantry_link_idp === itemPantryLinkId) inventory.orderCount = newCount 
            return inventory
        })
        this.setState({
            inventory: newInventory
        })
    }

    createOrder() {
        let {pantry_id} = this.props.user
        let orderItems = this.state.inventory.filter( item => item.orderCount !== 0)
        let itemInventoryLinks = orderItems.map( item => {
            return {
                itemInventoryId: item.item_pantry_link_idp,
                newQuantity: item.quantity - item.orderCount
            }
        })
        axios.put(`/api/inventory/${pantry_id}`, {itemInventoryLinks, familyId: 1}).then(response => {
            this.props.history.push('/home')
        }).catch(err => console.log('Err!'))
    }

    render(){
        let inventoryList = this.state.inventory.map( (pantryItem, i) => {
        return(
                <OrderFormItem
                key={pantryItem.item_pantry_link_idp}
                pantryItem={pantryItem}
                updateItemCount={this.updateItemCount}
                ></OrderFormItem>
            )
        })

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
                <div className="button-container">
                        <button className="buttons">
                            <Link  className="buttons" to='/home'>
                                Back to Dashboard
                            </Link>
                        </button>
                </div>
                    <button onClick={() => this.createOrder()}>Create Order</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user ? state.user : {}
    }
}

export default connect(mapStateToProps)(OrderForm)