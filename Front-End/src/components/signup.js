import React,{Component} from 'react';
import './stylesheet.css';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';

class Signup extends Component{
    constructor(){
        super();
        this.state={

        }
        this.func=this.func.bind(this);
        
    }
    func(event)
    {
        event.preventDefault();
        var obj={
            userName: event.target.username.value,
            password: event.target.password.value,
            name: event.target.name.value,
            age: event.target.age.value
        }
        fetch(`http://localhost:8081/users/add`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(obj)
        })
        .then( res => {
            if(res.ok){
            return res.json();}
        })
        .then(res => {
            alert('user added');
        })
    }


    render()
    {
        return <form className="css-form" onSubmit={this.func}>
            Username:<input name="username" type="text" ></input><br/>
            Password:<input name="password" type="password" ></input><br/>
            Full Name:<input name="name" type="text" ></input><br/>
            Your Age:<input name="age" type="text" ></input><br/>
            <center><input type="submit" value="signup"></input></center>
        </form>
    }
}
export default Signup;