import React, {  Component } from 'react'
import {connect} from "react-redux"
import { userSubmit,userDelete,userEdit,userEditIndex } from './redux/UserAction';
import Checkbox from 'antd/lib/checkbox/Checkbox'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstName:'',
      middleName:'',
      lastName:'',
      gender:'',
      country:'',
      city:'',
      hobby:[],
      language:[],
      index:'',
      userData:[],
      errors:{},
    }
  }
  componentDidMount(){
    this.setState({
      firstName:this.props.uEdit.firstname,
      middleName:this.props.uEdit.middlename,
      lastName:this.props.uEdit.lastname,
      gender:this.props.uEdit.gender,
      country:this.props.uEdit.country,
      city:this.props.uEdit.city,
      hobby:this.props.uEdit.hobby || [],
      language:this.props.uEdit.language || [],
      index:this.props.uEditIndex
    })
  }

componentDidUpdate(prevProps) {
  if (this.props.uEdit !== prevProps.uEdit) {
      console.log("useredit=-------->",this.props.userEdit)
    this.setState({
      firstName:this.props.uEdit.firstname, 
      middleName:this.props.uEdit.middlename,
      lastName:this.props.uEdit.lastname,
      gender:this.props.uEdit.gender,
      country:this.props.uEdit.country,
      city:this.props.uEdit.city,
      hobby:this.props.uEdit.hobby || [],
      language:this.props.uEdit.language || [],
      index:this.props.uEditIndex
    })
  }
}



  // Editrow = (data,i,index) =>{
  //   this.setState({
  //     firstName:i.firstname,
  //     middleName:i.middlename,
  //     lastName:i.lastname,
  //     gender:i.gender,
  //     country:i.country,
  //     city:i.city,
  //     hobby:i.hobby,
  //     language:i.language,
  //     index:index, 
  //   })
  // }

  // Deleterow = (r,i,index) =>{
  //   const data = this.props.tableData;
  //   console.log("tableDataaaaa-->",this.props.tableData)
  //   data.splice(index,1);
  //   console.log("splice-->",data)
  //   this.props.userDelete([...data])
  // }

  handleChange = (e , hobby) =>{
   const hobbyData = JSON.parse(JSON.stringify(this.state.hobby || []))
   const languageData =JSON.parse(JSON.stringify(this.state.language || []))
  //  console.log("this.state.hobby-->",this.state.hobby)
  //  console.log("this.state.language-->",this.state.language)
  //  console.log("e.target.name-->",e.target.name)
   console.log("e.target.value-->",e.target.value)
   console.log("hobbyy-->",hobby)
    if(hobby === "hobby" ){
     console.log("e.target--->",e.target)
     console.log("e.target.checked--->",e.target.checked)
     if(e.target.checked === true){
      hobbyData.push(e.target.name);
      console.log("targetname-->",e.target.name)
      console.log("hobbydata-->",hobbyData)
      this.setState({
        hobby: hobbyData
      })
    }
    else{
      const index = this.state.hobby.indexOf(e.target.name)
      console.log("indexxx-->",index)
      hobbyData.splice(index,1)
      console.log("splicehobbydata-->",hobbyData)
      this.setState({
        hobby: hobbyData
      })
    }
  }
  else if(hobby === "language"){
    console.log("e.target.checked--->",e.target.checked)
    if(e.target.checked === true){
      languageData.push(e.target.name)
      console.log("languageData-->",languageData)
      this.setState({
        language: languageData
      })
    }
    else{
      const index = this.state.language.indexOf(e.target.name)
      console.log("indexlanguage--->",index)
      languageData.splice(index,1)
      this.setState({
        language: languageData
      })
    }
  }
    else{
       this.setState({
       [e.target.name]: e.target.value
    })
   }
 }

 validation = (name, value) =>{
  console.log("nameeee------->",name)
  console.log("valueeee------->",value)
  switch(name){
    case ("firstname"):
      if(!value){
        return "*FirstName is required"
      }
      else{
        return ""
      }
    case ("middlename"):
      if(!value){
        return "*MiddleName is required"
      }
      else{
        return ""
      }
    case ("lastname"):
      if(!value){
        return "*LastName is required"
      }
      else{
        return ""
      }
    case ("gender"):
      if(!value){
        return "*Gender is required"
      }
      else{
        return ""
      }
    case ("country"):
      if(!value){
        return "*Country is required"
      }
      else{
        return ""
      }
    case ("city"):
      if(!value){
        return "*City is required"
      }
      else{
        return ""
      }
  }
}

  hendlesubmit = () =>{
    console.log("UEdittt=============================>",this.props.uEdit)
    console.log("UEditIndexxx===========>",this.props.uEditIndex)
    const errors ={};
    const user = {firstname:this.state.firstName,middlename:this.state.middleName,lastname:this.state.lastName,gender:this.state.gender,country:this.state.country, city:this.state.city, hobby:this.state.hobby,language:this.state.language, key: new Date().getTime()};
    const data = this.props.tableData;
    console.log("this.state.tableDataaa---->",this.state.language)
    // console.log("dataaaaaaaaa--------->",data)
    Object.keys(user).forEach(key => {
      const error = this.validation(key, user[key]);
      if (error && error.length > 0) {
        errors[key] = error;
      }
    });
    console.log("error length----->",Object.keys(errors).length)
    if (Object.keys(errors).length > 0) {
      this.setState({errors: errors});
      return
  }
  else{
    this.setState({errors:{}})
  }
    if(this.state.index===''){
      data.push(user);
    }
    else{
     data[this.state.index]=user;
     this.setState({
      index:""
     })    
    }
    this.setState({
       userData:[...data]
     })
     this.props.userSubmit([...data])
    //  console.log("user-->",user)
    //  console.log("index-->",this.state.index)
    //  console.log("data-->",data)
    //  console.log("...data-->",data)
   
    this.setState({
      firstName:'',
      middleName:'',
      lastName:'',
      gender:'',
      country:'',
      city:'',
      hobby:[],
      language:[],
    })
  }

  table = () =>{
    this.props.navigate("/RTable")
  };

  render() {
  console.log("statevvvvvvvv-------->",this.state)
  console.log("tabledatavvvvvv-------->",this.props.tableData)
     return (
      <>
      <div style={{margin: 10, marginLeft: 20,}}>
      <h2>Welcome to MyForm</h2>
        <label><b>First Name : </b></label>
        <input type="text" placeholder="Enter Your First Name" className="formvalidation" value={this.state.firstName} name="firstName" onChange={(e) => this.handleChange(e)}/>
        <b><span className="formvalidation" style={{color: "red"}}>{this.state.errors && this.state.errors.firstname}</span></b>
        <br />
        <label><b>Middle Name : </b></label>
        <input type="text" placeholder="Enter Your Middle Name" value={this.state.middleName}  name="middleName" onChange={(e) => this.handleChange(e)}/>
        <b><span className="formvalidation" style={{color: "red"}}>{this.state.errors && this.state.errors.middlename}</span></b> 
        <br />
        <label><b>Last Name : </b></label>
        <input type="text" placeholder="Enter Your Last Name" value={this.state.lastName} name="lastName" onChange={(e) => this.handleChange(e)}/>
        <b><span className="formvalidation" style={{color: "red"}}>{this.state.errors && this.state.errors.lastname}</span></b>
        <br />
        <h4><b>Select Your Gender : </b></h4>
        <label htmlFor="male"> <b>Male </b></label>
        <input 
        style={{marginRight: 12}}
        type="radio" 
        id="male" 
        name="gender" 
        value="male" 
        checked={this.state.gender === "male"} 
        onChange={(e) => this.handleChange(e)}/>
        <label htmlFor="female"> <b>Female </b></label>
        <input 
        style={{marginRight: 12}} 
        type="radio" 
        id="female" 
        name="gender" 
        value="female" 
        checked={this.state.gender === "female"} 
        onChange={(e) => this.handleChange(e)}/>
        <label htmlFor="other"> <b>Other </b></label>
        <input 
        style={{marginRight: 12}} 
        type="radio" 
        id="other" 
        name="gender" 
        value="other" 
        checked={this.state.gender === "other"} 
        onChange={(e) => this.handleChange(e)}/>
        <b><span className="formvalidation" style={{color: "red"}}>{this.state.errors && this.state.errors.gender}</span></b>
        <br /><br />
        <label><b>Select Your Country : </b></label>
        <select
         style={{ width: 150 }}
         type="selected"
         name="country"
         onChange={(e) => this.handleChange(e)}>
        <option value="" selected={this.state.country === ""}>Select Your Country</option>
        <option value="India" selected={this.state.country === "India"}>India</option>
        <option value="Pakistan" selected={this.state.country === "Pakistan"}>Pakistan</option>
        <option value="South Koriya" selected={this.state.country === "South Koriya"}>South Koriya</option>
        <option value="Malesiya" selected={this.state.country === "Malesiya"}>Malesiya</option>
        <option value="Afghanistan" selected={this.state.country === "Afghanistan"}>Afghanistan</option>
        <option value="Africa" selected={this.state.country === "Africa"}>Africa</option>
        <option value="New zealand" selected={this.state.country === "New zealand"}>New zealand</option>
        <option value="London" selected={this.state.country === "London"}>London</option>
        <option value="Brazil" selected={this.state.country === "Brazil"}>Brazil</option>
        <option value="Indonesia" selected={this.state.country === "Indonesia"}>Indonesia</option>
        <option value="Dubai" selected={this.state.country === "Dubai"}>Dubai</option>
        <option value="Qatar" selected={this.state.country === "Qatar"}>Qatar</option>
        <option value="Bangladesh" selected={this.state.country === "Bangladesh"}>Bangladesh</option>
        <option value="United Kingdom" selected={this.state.country === "United Kingdom"}>United Kingdom</option>
        <option value="United States" selected={this.state.country === "United States"}>United States</option>
        </select>
        <b><span className="formvalidation" style={{color: "red"}}>{this.state.errors && this.state.errors.country}</span></b>
        <br /><br />
        <label><b>Select Your City : </b></label>
        <select
         style={{ width: 150 }}
         type="selected"
         name="city"
         onChange={(e) => this.handleChange(e)}>
        <option value="" selected={this.state.city === ""}>Select Your City</option>
        <option value="Surat" selected={this.state.city === "Surat"}>Surat</option>
        <option value="Rajkot" selected={this.state.city === "Rajkot"}>Rajkot</option>
        <option value="Gir-Somnath" selected={this.state.city === "Gir-Somnath"}>Gir-Somnath</option>
        <option value="Bhavnagar" selected={this.state.city === "Bhavnagar"}>Bhavnagar</option>
        <option value="Morbi" selected={this.state.city === "Morbi"}>Morbi</option>
        <option value="Talala-Gir" selected={this.state.city === "Talala-Gir"}>Talala-Gir</option>
        <option value="Bharuch" selected={this.state.city === "Bharuch"}>Bharuch</option>
        <option value="Ankleswar" selected={this.state.city === "Ankleswar"}>Ankleswar</option>
        <option value="Gondal" selected={this.state.city === "Gondal"}>Gondal</option>
        <option value="Baroda" selected={this.state.city === "Baroda"}>Baroda</option>
        <option value="Kalavad" selected={this.state.city === "Kalavad"}>Kalavad</option>
        </select>
        <b><span className="formvalidation" style={{color: "red"}}>{this.state.errors && this.state.errors.city}</span></b>
        <br /><br />
        <h4><b>Select Your Hobby (optional) : </b></h4>
        <Checkbox
        type="checkbox"
        name="Cricket "
        value="Cricket"
        onChange={(e) => this.handleChange(e,"hobby")}
        checked={this?.state?.hobby?.includes("Cricket ")}/><b>Cricket</b>
        <Checkbox
        type="checkbox"
        name="Chess "
        value="Chess"
        onChange={(e) => this.handleChange(e,"hobby")}
        checked={this?.state?.hobby?.includes("Chess ")}/><b>Chess</b>
        <Checkbox
        type="checkbox"
        name="Kabbadi "
        value="Kabbadi"
        onChange={(e) => this.handleChange(e,"hobby")}
        checked={this?.state?.hobby?.includes("Kabbadi ")}/><b>Kabbadi</b>
        <br />
        <Checkbox
        type="checkbox"
        name="Carrom "
        value="Carrom"
        onChange={(e) => this.handleChange(e,"hobby")}
        checked={this?.state?.hobby?.includes("Carrom ")}/><b>Carrom</b>
        <Checkbox
        type="checkbox"
        name="FootBall "
        value="Foot Ball"
        onChange={(e) => this.handleChange(e,"hobby")}
        checked={this?.state?.hobby?.includes("FootBall ")}/><b>FootBall</b>
        <Checkbox
        type="checkbox"
        name="Volleyball "
        value="Volley Ball"
        onChange={(e) => this.handleChange(e,"hobby")}
        checked={this?.state?.hobby?.includes("Volleyball ")}/><b>VolleyBall</b>
        <br /><br />
        <h4><b>Select Your Langauge (optional) : </b></h4>
        <Checkbox
        type="checkbox"
        name="Gujrati "
        value="Gujrati"
        onChange={(e) => this.handleChange(e ,"language")}
        checked={this?.state?.language?.includes("Gujrati ")} /><b>Gujrati</b>
        <Checkbox
        type="checkbox"
        name="Hindi "
        value="Hindi"
        onChange={(e) => this.handleChange(e,"language")}
        checked={this?.state?.language?.includes("Hindi ")} /><b>Hindi</b>
        <Checkbox
        type="checkbox"
        name="English "
        value="english"
        onChange={(e) => this.handleChange(e,"language")}
        checked={this?.state?.language?.includes("English ")} /><b>English</b>
        <br />
        <Checkbox
        type="checkbox"
        name="Marathi "
        value="Marathi"
        onChange={(e) => this.handleChange(e,"language")}
        checked={this?.state?.language?.includes("Marathi ")} /><b>Marathi</b>
        <Checkbox
        type="checkbox"
        name="Tamil "
        value="Tamil"
        onChange={(e) => this.handleChange(e,"language")}
        checked={this?.state?.language?.includes("Tamil ")} /><b>Tamil</b>
        <Checkbox
        type="checkbox"
        name="Telugu "
        value="Telugu"
        onChange={(e) => this.handleChange(e,"language")}
        checked={this?.state?.language?.includes("Telugu ")} /><b>Telugu</b>
        <br /><br />
        <button style={{margin:5,marginLeft: 90}} onClick={()=>this.hendlesubmit()}><b>Submit</b></button>
        <button onClick={() => this.table()}><b>Table</b></button>
      </div>
      {/* <RTable Editrow={this.Editrow} Deleterow={this.Deleterow}/> */}
      </>
    )
  }
};

const mapStateToProps=(state)=>{  
  return{
    tableData:state.data,
    uEdit:state.userEditData,
    uEditIndex:state.userEditIndex
  }
};

const mapDispatchToProps=(dispatch)=>{
  return{
      userSubmit: (data) => dispatch(userSubmit(data)),
      userDelete: (data) => dispatch(userDelete(data)),
      userEdit: (data) => dispatch(userEdit(data)),
      userEditIndex: (data) => dispatch(userEditIndex(data)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);