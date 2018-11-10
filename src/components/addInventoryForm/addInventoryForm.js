import React, { Component } from "react"

export default class AddInventory extends Component {
    constructor(props) {
      super(props);
      this.state = {
          inventory : [],
          item: ''
      };
    }
    componentDidMount(){
        this.props.getItems
    }
    
    handleItemInput = (e) => {
        this.setState({
            item: e.target.value
        })
    }

    handleInventorySubmit = () => {

    }


    render(){
        let {item} = this.state
        return(
        <div>
            <h1>ADD INVENTORY</h1>
            <form onSubmit={this.handleInventorySubmit}>
                <p>Item Name</p>
                <input type='submit text' autoFocus='true' onChange={this.handleItemInput} value={item}></input>
            </form>
        </div>
        )
    }
}