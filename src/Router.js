import App from "./App"
import RTable from "./component/Table"
import React , { Component } from 'react'
import {Routes , Route , useParams , useNavigate} from 'react-router-dom'

function withParams(Component){
    return props => <Component {...props} params = {useParams()} navigate={useNavigate()} />
}

class Router extends Component {
    constructor(props){
      super(props)
    }

render() {
    return(
        <>
            <Routes path = "/">
                <Route path = "/" element = {<App {...this.props} />} />
                <Route path = "/RTable" element = {<RTable {...this.props} Editrow ={this.props.Editrow} Deleterow = {this.props.Deleterow} />} />
            </Routes>
        </>
    )
  }
}

export default withParams(Router)