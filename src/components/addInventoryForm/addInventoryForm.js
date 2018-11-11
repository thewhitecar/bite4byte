import React, { Component } from "react"
import axios from "axios"
import {connect} from 'react-redux'
import {getInventory} from '../../redux/reducer'
import {Link} from 'react-router-dom'
import './addInventoryForm.css'

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

    addToInventory = () => {
        let promises = []
        this.state.selectedItems.forEach(e => {
            promises.push(axios.post(`/api/inventory?itemId=${e.id}&quantity=${e.quantity}&pantryId=${this.props.user.pantry_id}&itemName=${e.item_name}`))
        })
        Promise.all(promises).then(e => {
           this.props.history.push('/home')
        })
    }


    render(){
        console.log(this.state.selectedItems)
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
            <button onClick={this.addToInventory}>Add Invenvtory</button>
            <div class='add-container'>
                <div className="button-container">
                    <button className="buttons">
                        <Link className="buttons" to='/home'>
                                    Back to Dashboard
                        </Link>
                    </button>
                </div>
            </div>
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