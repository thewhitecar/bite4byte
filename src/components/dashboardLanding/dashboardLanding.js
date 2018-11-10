import React, { Component } from "react";
import axios from 'axios';
import './dashboard.css'

export default class Dashboard extends Component {
    constructor(props) {
      super(props);
      this.state = {
          inventory : [],
          familyList: []
      };
    }
  
    // componentDidMount() {
    //   axios.get("/api/inventory/1").then(response => {
    //     this.setState({

    //     });
    //   });
    // }

    
  

    render() {

        // let familyList = this.state.familyList.map(familyName => {
        //     <li>{familyName}</li>
        // })

        return (
            <div className="dash-window">
                <div className="left-side-nav">
                    <h1>Families</h1>
                    {/* {familyList} */}
                </div>

                <div className="right-side">
                    <h1>Current Inventory</h1>
                </div>

            </div>
        )
        }
    }
      
  
//   let mapStateToProps = state => {
//     return {

//     };
//   };
  
//   export default connect( mapStateToProps, { logOut } )( Dashboard )


//send pantry ID