import React, { Component } from 'react'
import { Table } from "antd";
import "antd/dist/antd.css"
import { EditOutlined , DeleteOutlined } from '@ant-design/icons'
import {connect} from "react-redux";
import { userDelete , userEdit , userEditIndex} from '../redux/UserAction'

class RTable extends Component {
    constructor(props){
    super(props);
      console.log("props-------->", props);
      this.state = {
        tableData:[]
      }
    };

  //   componentWillReceiveProps(nextProps) {
  //     console.log('nextprops-->', nextProps);
  //     if (nextProps.tableData != this.props.tableData){
  //     this.setState({
  //       tableData: [...nextProps.tableData]
  //     })
  //   }
  // }

  Editrow = (data,i,index) =>{
    console.log("iiiiiiiiiii--------->",i)
    console.log("indexxxxxxx--------->",index)
    // console.log("dataaaaa--------->",data)
    this.setState({
      firstName:i.firstname,
      middleName:i.middlename,
      lastName:i.lastname,
      gender:i.gender,
      country:i.country,
      city:i.city,
      hobby:i.hobby,
      language:i.language,
    })
    this.props.userEdit(i)
    this.props.userEditIndex(index)
    this.props.navigate("/")
  }


  Deleterow = (r,i,index) =>{
    const data = this.props.tableData;
    console.log("tableDataaaaa-->",this.props.tableData)
    data.splice(index,1);
    console.log("splice-->",data)
    this.props.userDelete([...data])
  }

  goback = () =>{
    this.props.navigate("/")
  }

      column =[
        {
          title: "First Name",
          dataIndex: "firstname",
          key: "fname",
        },
        {
          title: "Middle Name",
          dataIndex: "middlename",
          key: "mname",
        },
        {
          title: "Last Name",
          dataIndex: "lastname",
          key: "lname",
        },
        {
          title: "Gender",
          dataIndex: "gender",
          key: "gender",
        },
        {
          title: "Country",
          dataIndex: "country",
          key: "country",
        },
        {
          title: "City",
          dataIndex: "city",
          key: "city",
        },
        {
          title: "Hobby",
          dataIndex: "hobby",
          key: "hobby",
          render:(index) =>(
            <>
              {index + '' }
            </>
          )
        },
        {
          title: "Language",
          dataIndex: "language",
          key: "language",
          render:(index) =>(
            <>
              {index + ''}
            </>
          )
        },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",

          render:(data,i,index ) =>(
            <>
            <EditOutlined onClick={() =>{this.Editrow(data,i,index)}}/>
            <DeleteOutlined onClick={() =>{this.Deleterow(data,i,index)}}/>
            </>
          )
        }
      ]

    render() {
      console.log("stateeeeeeeeee-------->",this.state)
      console.log("tabledataaaaaaaaaa-------->",this.props.tableData)
      const {tableData} = this.state
      return (
        <>
        <Table dataSource={this.props.tableData} columns={this.column}/>
        <button onClick={() => this.goback()}><b>Go Back</b></button>
        </>
      )
   }
}
const mapStateToProps=(state)=>{  
  return{
    tableData:state.data,
    uEdit:state.userEditData,
    uEditIndex:state.userEditIndex,
  }
};

  const mapDispatchToProps=(dispatch)=>{
      return{
          userDelete: (data) => dispatch(userDelete(data)),
          userEdit: (data) => dispatch(userEdit(data)),
          userEditIndex: (data) => dispatch(userEditIndex(data)),
      }
    };

export default connect(mapStateToProps,mapDispatchToProps)(RTable);