import React, { Component } from "react"
import axios from "axios"
import {connect} from 'react-redux'
import {getInventory} from '../../redux/reducer'

class AddInventory extends Component {
    constructor(props) {
      super(props);
      this.state = {
          itemSearch: '',
          searchResults: [],
          selectedItems: []
      };
    }
    
    handleItemSearch = (e) => {
        this.setState({
            itemSearch: e.target.value
        })
            axios.get(`/api/inventory?searchTerm=${e.target.value}`).then(results => {
                this.setState({searchResults: results.data})
            })
    }

    handleSelect = (item) => {
        let newItem = {...item, quantity: 1}
        this.setState({selectedItems: [...this.state.selectedItems, newItem]})
    }

    updateQuantity = (item, index, dir) => {
        let selectedItems = this.state.selectedItems.slice()
        if(dir === 'up') {
            let newQuantity = item.quantity + 1 
           selectedItems[index].quantity = newQuantity
        } else if (dir === 'down') {
            let newQuantity = item.quantity - 1 
            if(newQuantity > 0) {
               selectedItems[index].quantity = newQuantity
            } else {
                selectedItems.splice(index, 1)
            }
        }
        this.setState({selectedItems})
    }


    render(){
        let {itemSearch, searchResults} = this.state
        let results = searchResults.map(e => {
            return (
                <p onClick={() => this.handleSelect(e)}>
                    {e.item_name}
                </p>
            )
        })

        let selectedItems = this.state.selectedItems.map((e, i) => {
            return (
                <div>
                    <p>{e.item_name}</p>
                    <p>Quantity: {e.quantity}</p>
                    <button onClick={() => this.updateQuantity(e, i, 'up')}>+</button>
                    <button onClick={() => this.updateQuantity(e, i, 'down')}>-</button>
                </div>
            )
        })

        return(
        <div>
            <h1>ADD INVENTORY</h1>
            <input value={itemSearch} onChange={this.handleItemSearch}/>
            <div>
                {results}
            </div>
            <div>
                <h4>Items To Be Added</h4>
                {selectedItems}
            </div>
            <button>Add Invenvtory</button>
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps, {getInventory})(AddInventory)