import React, { Component } from "react"
import axios from "axios"
import {connect} from 'react-redux'

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
            console.log(results.data)
            this.setState({searchResults: results.data})
        })
    }

    render(){
        let {itemSearch, searchResults} = this.state
        let results = null
        if(searchResults.length) {
            results = searchResults.map(e => {
                return (
                    <div>
                        {e.item_name}
                    </div>
                )
            })
        }
        return(
        <div>
            <h1>ADD INVENTORY</h1>
            <input value={itemSearch} onChange={this.handleItemSearch}/>
            <button onClick={this.handleSearchSubmit}>Search</button>
            {results}
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        inventory: state.inventory
    }
}

export default connect(mapStateToProps)(AddInventory)