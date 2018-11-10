import React, { Component } from "react"

export default class AddInventory extends Component {
    constructor(props) {
      super(props);
      this.state = {
          inventory : []
      };
    }

    render(){
        return(
            <h1>ADD INVENTORY</h1>
        )
    }
}