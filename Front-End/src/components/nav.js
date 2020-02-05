import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom';
class Navbar extends Component{
    constructor(){
      super();
      this.state={
        fetchUsername : 'username'
      }
      this.search=this.search.bind(this);
      
    }

    componentDidMount()
    {
      fetch(`http://localhost:8081/users/getUsername`)
        .then(res=>res.json())
        .then(res => {
             this.setState({fetchUsername : res});
            console.log(res);
        })
        .catch(err => console.log(err));
      }

    search(event)
    {
      event.preventDefault();
      var searchInput= event.target.value;
      
      fetch(`http://localhost:8081/books/searchBook?searchInput=${searchInput}`)
        .then(res=>res.json())
        .then(res => {
          console.log(res);
          this.props.books(res);
           // this.setState({books:res});
        })
        
    }

    
    render()
    {
        return <div className="container-fluid" style={{backgroundColor:"rgb(60,60,60)"}}>
            
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                  {/* eslint-disable-next-line*/}          
              <a className="navbar-brand" href="#">WELCOME</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                      {/* eslint-disable-next-line*/}
                    <Link className="nav-link" to='/display'>Home <span className="sr-only">(current)</span></Link>
                  </li>
                  <li className="nav-item">
                      {/* eslint-disable-next-line*/}
                    <Link className="nav-link" to="/form">ADD BOOKS</Link>
                  </li>
                  <li className="nav-item">
                      {/* eslint-disable-next-line*/}
                    <div className="username" style={{color:"white"}}>{this.state.fetchUsername}</div> 
                  </li>
                  <li className="nav-item">
                      {/* eslint-disable-next-line*/}
                    <Link className="nav-link" to="/profile">PROFILE</Link>
                  </li>
                </ul>
              
                <form onSubmit={this.search}>
                  <input placeholder="Search" name="search" onKeyUp={this.search}/>
                  <button type="submit">Search</button>
                </form>
              </div>
            </nav>
                
        </div>
    }
}

export default Navbar;
