import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Home from './home.js';
import Navbar from './nav.js';
class Form extends Component{
    constructor(){
        super();
        this.state={
            redirect_val:false
        }
        this.add=this.add.bind(this);
    }

    add(event)
    {
        event.preventDefault();
        const idd=event.target.id.value;
         const namee=event.target.name.value;
         const auth=event.target.author.value;
        console.log(event);
        const obj={
            id:idd,
            name:namee,
            author:auth
         }
        fetch(`http://localhost:8081/books/form`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(obj)
        })
        .then( res => {
            if(res.ok){
            alert(`New book added successfully`);
            this.setState({
                redirect_val:true
                 })
            }
            else{
                alert('Book id already taken.');
            }
        })    
    }
    render()
    {
        console.log(this.state.redirect_val);
        if(this.state.redirect_val===true) {
            
            return <Redirect to='/display' />
            //console.log("1");
        }
        
        return (<div>
            
        <fieldset>
            <h1>Enter Book Details</h1>
            <form className="css-form" onSubmit={this.add}>
            Enter Book Id:<input name="id" type="text" required></input><br/>
            Enter Book Name:<input name="name" type="text" ></input><br/>
            Enter Book Author:<input name="author" type="text" ></input><br/>
            <input type="submit" value="submit"></input>
            </form>
        </fieldset></div>)
        
    }
}
export default Form;
