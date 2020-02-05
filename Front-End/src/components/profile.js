import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import './styleform.css'
class Profile extends Component{
    constructor(){
        super();
        this.state={
            user : {}
        }
   }

   componentDidMount()
   {
       fetch(`http://localhost:8081/users`)
       .then(res=>res.json())
       .then(res => {
            this.setState({user : res});
           console.log(res);
       })
       .catch(err => console.log(err));
     }
     
    render()
    {

        
        return (
            <div>
                <label for="name">Name</label>
                <input type="text" id="name" name="name" value={this.state.user.name} disabled/>
                <br/><br/>

                <label for="age">Age</label>
                <input type="text" id="age" name="age" value={this.state.user.age} disabled/>
                <br/><br/>
            </div>
        )   
    }
}


export default Profile;

