import React, { Component } from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import {getInventory} from '../../redux/reducer'
import './dashboard.css'

class Dashboard extends Component {
    constructor(props) {
      super(props);
      this.state = {
          inventory : [],
          familyList: []
      };
    }
  
    componentDidUpdate(prevProps){
      if(!prevProps.user && this.props.user){this.props.getInventory(this.props.user.pantry_id)}
    }

    componentDidMount(){
        if(this.props.user){this.props.getInventory(this.props.user.pantry_id)}
    }

    render() {
        let familyList;
        if(this.props.families)familyList = this.props.families.map(familyName => {
            let colorcode;
            if(familyName.picked_up){colorcode = "#ff0000"}
            else{colorcode = "#000000"}
            return(
            <li style={{color : `${colorcode}`}}>{familyName.family_name}</li>
            )
        })
    
        let currentInventory;
        if(this.props.inventory){currentInventory = this.props.inventory.map(items => {
            return(
                <div className="pantry-item-container">
                    <li>{items.item_name}</li>
                    <h3>Quantity: {items.quantity}</h3>
                </div>
            )})}



        return (
            
            <div className="dash-window">
                <div className="left-side-nav">
                    <h1>Families</h1>
                    <ul>
                        {familyList}
                    </ul>
                </div>

                <div className="right-side">
                    <div className="button-container">
                        <button className="buttons">
                            <Link  className="buttons" to='/add'>
                                Add Inventory
                            </Link>
                        </button>
                        <button className="buttons">
                            <Link className="buttons"to='/order'>
                                Create Order
                            </Link>
                        </button>
                    </div>
                    <h1>Current Inventory</h1>
                    <ul>
                        {currentInventory}
                    </ul>
                </div>

            </div>
            )
        }
    }
      
  
  let mapStateToProps = state => {
    return {
        user: state.user,
        inventory: state.inventory,
        families: state.families
    };
  };
  
  export default connect( mapStateToProps, { getInventory } )( Dashboard )