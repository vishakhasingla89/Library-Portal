import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';

class Login extends Component{
    constructor(){
        super();
        this.state={
           redirect_to_home:false
        }
        this.func=this.func.bind(this);
        
    }
    func(event)
    {
        event.preventDefault();
        var obj={
            userName: event.target.username.value,
            password: event.target.password.value
        }
        fetch(`http://localhost:8081/users/login`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(obj)
        })
        .then( res => {
            if(res.ok){
                return res.json();
            }
            
        })
        .then(res=>{
           // window.location.assign('/display');
           console.log(res)
           this.setState({
            redirect_to_home:true
        })
        })
        
        
    }


    render()
    {
        if(this.state.redirect_to_home)
        {
            return <Redirect to='/display'></Redirect>
        }
        return <form className="css-form" onSubmit={this.func}>
            <h1>Login here</h1>
            Enter Username:<input name="username" type="text" ></input><br/>
            Enter Password:<input name="password" type="password" ></input><br/>
            <input type="submit" value="Login"></input>
        </form>
    }
}
export default Login;

