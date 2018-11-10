import React, { Component } from "react"
import axios from "axios"

class AddInventory extends Component {
    constructor(props) {
      super(props);
      this.state = {
          itemSearch: '',
          searchResults: []
      };
    }
    
    handleItemSearch = (e) => {
        this.setState({
            itemSearch: e.target.value
        })
    }

    handleSearchSubmit = () => {
        axios.get(`/api/inventory?searchTerm=${this.state.itemSearch}`).then(results => {
            this.setState({searchResults: results.data})
        })
    }

    render(){
        let {itemSearch, searchResults} = this.state
        if(searchResults.length) {
            
        }
        return(
        <div>
            <h1>ADD INVENTORY</h1>
            <input value={itemSearch} onChange={this.handleItemSearch}/>
            <button onClick={this.handleSearchSubmit}>Search</button>
        </div>
        )
    }
}

export default AddInventory