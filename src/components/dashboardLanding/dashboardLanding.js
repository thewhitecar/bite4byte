import React, { Component } from "react"

export default class Dashboard extends Component {
    constructor(props) {
      super(props);
      this.state = {
          inventory : [],
          familyList: [],
      };
    }
  
    // componentDidMount() {
    //   axios.get("/api/gearCategoryView").then(response => {
    //     this.setState({
    //       data: response.data,
    //       dataMax: response.data.length
    //     });
    //   });
    // }

    
  

    render() {

        // let familyList = this.state.familyList.map(familyName => {
        //     <li>{familyName}</li>
        // })

        return (
            <div className="left-side-nav">

            </div>
        )
        }
    }
      
  
//   let mapStateToProps = state => {
//     return {

//     };
//   };
  
//   export default connect( mapStateToProps, { logOut } )( Dashboard )