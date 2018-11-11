import React, { Component } from "react"
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getItems} from '../../redux/reducer'
import './addInventoryForm.css'

class AddInventory extends Component {
    constructor(props) {
      super(props);
      this.state = {
          item: ''
      };
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
            <div class='add-container'>
                <form onSubmit={this.handleInventorySubmit}>
                    <p>Item Name</p>
                    <input type='submit text' autoFocus='true' onChange={this.handleItemInput} value={item}></input>
                </form>
                <br/>
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

function mapStateToProps(state){
    return {
        inventory: state.items
    }
}
export default connect(mapStateToProps, {getItems}) (AddInventory)