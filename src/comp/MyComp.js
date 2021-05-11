import React from 'react';
import './Appx/Appx.css';
import Api from "./../Services/Api";
import Child from "./Child";
const baseUrl = "https://reqres.in/api/users?page="
const url1="https://api.backendless.com/D061D8C7-065D-4B3D-8B16-AE75A02E6CA1/5F67E8A5-ED93-4164-B613-65C075D89BF0/users/register"
const url2="https://api.backendless.com/D061D8C7-065D-4B3D-8B16-AE75A02E6CA1/5F67E8A5-ED93-4164-B613-65C075D89BF0/users/login"
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            userInput2: '',
            userInput3: '',
            Success: false,
            showPassword: false ,
            localStorage: false ,
            resp: [] ,
            pageNo: '' ,
            pageSet: false ,
            count: 0,
            activeRegister: false
        }

        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit1 = this.handleSubmit1.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);
        this.inputPageNo = this.inputPageNo.bind(this);
        this.pageNoSubmit = this.pageNoSubmit.bind(this);
        this.registerPage = this.registerPage.bind(this);
        this.loginPage = this.loginPage.bind(this);
        this.register = this.register.bind(this);
    }
    componentDidMount() {
        var x = localStorage.getItem("Email");
        if(x!==null){
            this.setState({
                localStorage: true 
            });
        }
    }
    handleChange2(event) {
        this.setState({
            userInput2: event.target.value
        });
    }
    handleChange3(event) {
        this.setState({
            userInput3: event.target.value
        });
    }
    handleSubmit() {
        if(this.state.userInput2==='' && this.state.userInput3===''){
            alert("Please Enter Your Email Id and Password.");
        }

        else if(this.state.userInput2===''){
            alert("Please Enter Your Email Id.");
        }
        else if(this.state.userInput3===''){
            alert("Please Enter Your Password.");
        }

        else if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.userInput2)){
            Api.post(url2,{  
                "login" : this.state.userInput2,
                "password" : this.state.userInput3
              }).then((res) => {
                console.log("resp3", res)
                if(res.objectId !==''){
                    alert("Login successful"); 
                    localStorage.setItem('Email', this.state.userInput2);
                    this.setState({
                        Success: true
                    })
                }
                else{
                    alert("Login unsuccessful"); 
                }
            }).catch((error) => {
                console.log("error1",error);

            });
            
        }
        else{
            alert("You have entered an invalid email address!");
            this.setState({
                userInput2: ''
            })
        }
    }
    handleSubmit1(){
        localStorage.removeItem("Email");
        this.setState({
            Success: false ,

            userInput2: '',
            userInput3: '' ,
            localStorage: false
        })
    }
    handleSubmit2(){
        if(this.state.showPassword===false){
            this.setState({
                showPassword: true 
            })
        }
        else{
            this.setState({
                showPassword: false
            })
        }  
    }
    inputPageNo(event) {
        //console.log("event.target.value",event.target.value)
        if (event.target.value > 0 || event.target.value === '') {
            this.setState({
                pageNo: event.target.value
            });
        }
    }
    pageNoSubmit(){
        if (this.state.pageNo !== '') {
            let temp = this.state.pageNo;
            Api.get(baseUrl + temp).then((res) => {
                console.log("resp", res.data)
                if (res.data.length !== 0) {
                    this.setState({
                        resp: res.data ,
                        pageSet: true
                    });
                }
                else {
                    this.setState({
                        count: 1 ,
                        pageSet: false
                    });
                }
            }).catch((error) => {
                console.log(error);
            });
        }
        else{
            alert("Please Enter The Page No!");
            this.setState({
                count: 0 ,
                pageSet: false
            });
        }
    }
    registerPage(){
        this.setState({
            activeRegister: true
        });
    }
    loginPage(){
        this.setState({
            activeRegister: false
        });
    }
    register(){
        if(this.state.userInput2==='' && this.state.userInput3===''){
            alert("Please Enter Your Email Id and Password.");
        }

        else if(this.state.userInput2===''){
            alert("Please Enter Your Email Id.");
        }
        else if(this.state.userInput3===''){
            alert("Please Enter Your Password.");
        }

        else if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.userInput2)){
            Api.post(url1,{  
                "email" : this.state.userInput2,
                "password" : this.state.userInput3
              }).then((res) => {
                console.log("resp2", res)
                if(res.objectId){
                    alert("Registration successful"); 
                    this.setState({
                        activeRegister: false,
                        userInput2: '',
                        userInput3: ''
                    })
                }
                else{
                    alert("Registration unsuccessful"); 
                }
            }).catch((error) => {
                console.log("error",error);
            });
            
        }
        else{
            alert("You have entered an invalid email address!");
            this.setState({
                userInput2: ''
            })
        }
        
    }

    render() {
        
        return (
            <div>
                {this.state.Success || this.state.localStorage ? <div className="Appx2">
                    <h1>Welcome {localStorage.getItem("Email")},You are successfully logged in.</h1>
                    <button onClick={this.handleSubmit1}>LOGOUT</button>
                    <br/>
                    <div className="pageNoContainer">
                    <input
                        className="inputStyle"
                        onChange={this.inputPageNo}
                        value={this.state.pageNo}
                        type = "number"
                        placeholder="Enter The Page Number"
                    /> 
                    <button onClick={this.pageNoSubmit}>SUBMIT</button></div>
                    {this.state.pageSet ? 
                    <div className="table">
                    <table> 
                        <tr>
                            <th>Firstname</th> 
                            <th>Lastname</th> 
                            <th>Id</th>
                        </tr>
                        {this.state.resp.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>{item.id}</td>
                            </tr>
                        );
                    }) }
                    </table> 
                    </div> : <div>{this.state.count === 1 ? <div>Table have no content</div> : <div></div>} </div>}
                    <Child/>
                    </div> :
                    <div>
                        {this.state.activeRegister ? 
                        <div className="Appx2">
                        <h1>Register to Your Account</h1>
                    </div> :<div className="Appx2">
                            <h1>Login to Your Account</h1>
                        </div> }
                        <div className="Appx5">
                            <div className="Appx1">
                                <div className="Appx4">
                                    <div className="Appx6">

                                        <input
                                            className="inputStyle"
                                            onChange={this.handleChange2}
                                            value={this.state.userInput2}
                                            placeholder="Enter Your Email Id"
                                        /> 

                                        <input
                                            className="inputStyle"
                                            onChange={this.handleChange3}
                                            value={this.state.userInput3}
                                            type={this.state.showPassword ? "text" : "password"}
                                            placeholder="Enter Your Password"
                                        />
                                    </div>
                                    <br />
                                    <div className="Appx3">
                                        <label className="checkPass"><input type="checkbox" onClick={this.handleSubmit2} /> <span> Show Password </span></label> 
                                        {this.state.activeRegister ? 
                                        <button onClick={this.register}>REGISTER</button> :
                                        <button onClick={this.handleSubmit}>LOGIN</button> }
                                    </div>
                                    {this.state.activeRegister ? 
                                    <div className="Appx2">
                                    Already have an account?
                                    <a href="#" onClick={this.loginPage}>Login here</a></div> :
                                    <div className="Appx2">
                                    Don't have an account?
                                    <a href="#" onClick={this.registerPage}>please Register</a></div> }
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
export default MyComponent;


