import React, {Component} from 'react'
const plus = require('../images/plus.png')

export default class OrderFormItem extends Component {
    constructor() {
        super()
        this.state = {
            count: 0
        }
    }
    increaseCount() {
        let {orderCount, quantity, item_pantry_link_idp} = this.props.pantryItem
        let count = orderCount + 1 
        count = count > quantity ? orderCount : count
        this.props.updateItemCount(item_pantry_link_idp, count)
    }
    render() {
        let {pantryItem} = this.props
        return (
            <div className="pantry-item-container">
                <li>{pantryItem.item_name}</li>
                <h3>Quantity in pantry: {pantryItem.quantity}</h3>
                <img src={plus} onClick={() => this.increaseCount()}/>
                <h3>Count in Order: {pantryItem.orderCount}</h3>
            </div>
        )
    }
}