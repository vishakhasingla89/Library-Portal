import React,{Component} from 'react';
import Title from './title';
import Navbar from './nav.js';
import Signup from './signup';
import {Link} from 'react-router-dom';
class Home extends Component{
    render()
    {
        return <div className="container">
            
             <div className="row">
                <div className="col">
                <Title/>
                </div>
             </div>
             
             <div className="row">
                 <div className="col">
                     <Signup></Signup>
                 </div>
             </div>
             <div className="row">
                <div className="col" style={{textAlign:"right"}}>
                Already have an account?<button><Link to="/login">Login</Link></button>
                </div>
             </div>
           
        </div>
    }
}
export default Home;