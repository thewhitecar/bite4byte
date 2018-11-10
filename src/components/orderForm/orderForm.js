import React, { Component } from "react"
import axios from "axios";
import './orderForm.css'
import { connect } from "react-redux";
import OrderFormItem from '../OrderFormItem'
import {getInventory} from '../../redux/reducer'

class OrderForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
          inventory: [],
          cartItems: [],
          selectedFamily: 1
      };
    }

    componentDidMount(){
        if(this.props.user){
            console.log(11111)
            this.props.getInventory(this.props.user.pantry_id)
            this.getInventory()
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.user.id !== this.props.user.id) {
            console.log(22222)
            this.props.getInventory(this.props.user.pantry_id)
            this.getInventory()
        }
    }

    getInventory = () => {
        axios.get(`/api/inventory/${this.props.user.pantry_id}`).then(results => {
            let inventory = results.data.inventory.map( item => {return {...item, orderCount: 0}})
            this.setState({
                inventory
            })
        })
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
        let {selectedFamily} = this.state
        // console.log(selectedFamily )
        let orderItems = this.state.inventory.filter( item => item.orderCount !== 0)
        let itemInventoryLinks = orderItems.map( item => {
            return {
                itemInventoryId: item.item_pantry_link_idp,
                newQuantity: item.quantity - item.orderCount
            }
        })
        axios.put(`/api/inventory/${pantry_id}`, {itemInventoryLinks, familyId: selectedFamily }).then(response => {
            this.props.history.push('/home')
        }).catch(err => console.log('Err!'))
    }

    handleFamilyChange = (e) => {
        console.log(11111)
        this.setState({
          selectedFamily: e.target.value
        })
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

        let familyMap;
        console.log(this.props)

        if(this.props.families){familyMap = this.props.families.map(e => {
            return <option value={`${e.family_id}`}>{`${e.family_name}`}</option>;
        })}

        return(
            <div className="dash-window">
                <h1 style={{marginBottom: "50px"}}>Create Order</h1>
                <div className="order-form-container">
                    <div id="left-side">
                        <h2>Select Family</h2>
                        <select onChange={() => this.handleFamilyChange}>
                            {familyMap}
                        </select>


                        <div>
                            <p>Current Inventory</p>
                        </div>
                        <ul>
                            {inventoryList}
                        </ul>
                        <button onClick={() => this.createOrder()}>Create Order</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user ? state.user : {},
        families: state.families
    }
}

export default connect(mapStateToProps, { getInventory })(OrderForm)