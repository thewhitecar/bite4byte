import React, { Component } from "react"

export default class OrderForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
          cartItems: [],
      };
    }

    render(){
        return(
            <h1>ORDER FORM</h1>
        )
    }
}