import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import {login} from '../redux/reducer'


class AuthCheck extends Component {
    componentDidMount() {
        axios.get('/api/getCoordinator').then(results => {
            this.props.login(results.data)
        })
    }

    componentDidUpdate(prevState, prevProps) {
        if(this.props.location.pathname !== '/') {
            if(!this.props.user) {
                this.props.history.push('/')
            }
        }
    }
    
    render() {
        return(
            <div>
                {this.props.children}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps, {login})(AuthCheck))