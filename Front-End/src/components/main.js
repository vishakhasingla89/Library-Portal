import React,{Component} from 'react';
import Home from './home';
import Display from './display';
import Form from './form';
import EditBook from './edit.js';
import Navbar from'./nav.js';
import NotFound from './notfound.js';
import Login from './login.js';
import './stylesheet.css';
import Protected from'./protected.js';
import Unprotected from './unprotected.js';
import {Link} from 'react-router-dom';
import {Route,Switch} from 'react-router-dom';
import Profile from './profile';
class Main extends Component{
    constructor()
    {
        super();

        this.state={
            books:[],
            selectedBook:{
                "id":"1",
                "name" :"a",
                "author":"a"
                
            }
    
        }
    
        //this.add=this.add.bind(this);
        this.remove=this.remove.bind(this);
        this.fetchBooks=this.fetchBooks.bind(this);
        this.sendBook=this.sendBook.bind(this);
        this.edit=this.edit.bind(this);
        this.filterBooks=this.filterBooks.bind(this);
    }
    componentDidMount(){
        console.log('component did mount was called');
        fetch(`http://localhost:8081/books/bookList`)
        .then(res=>res.json())
        .then(res => {
            this.setState({books:res});
        })
    }

    fetchBooks()
    {
        fetch(`http://localhost:8081/books/bookList`)
        .then(res=>res.json())
        .then(res => {
            this.setState({books:res});
        })
    }
    
   
    remove(book)
    {
        console.log(book);
        fetch(`http://localhost:8081/books/remove?id=${book.id}`,{
            method:"DELETE",
            headers:{"Content-Type":"application/json"}
            
           
        })
        .then( res => {
            if(res.ok)
            {
                console.log(`${book} is deleted`);
                this.fetchBooks();
            return res.json
            }  }  )
        .then(res => {
            
            alert(`book deleted successfully`)
        })
        
    }
    edit(obj)
    {
        fetch(`http://localhost:8081/books/editBook?id=${obj.id}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(obj)
        })
        .then(res => {
            if(res.ok)
            return res.json
        })
        .then(res => {
            alert('Book updated successfully');
            this.fetchBooks();
        })
        
        window.location.assign("/display");

    }

    sendBook(book)
    {
        this.setState({
            selectedBook:book,
            
        })
    }

    filterBooks(arr){
        console.log('hello', arr);
        this.setState({
            books:arr
        })
    }
    
    render()
    {
    
    return (
        <div>
            
            <Switch>
            <Route exact path='/' render={()=>(
                <div className="home-container"><Home/></div>)
            }></Route> 

            <Route exact path='/display' render={()=>(
                <div><Navbar books={this.filterBooks}/>
                <Display books={this.state.books} onRemove={this.remove} sendSelectedBook={this.sendBook}/></div>)
            }></Route>
            <Route exact path='/form' render={()=>(
                <div className="home-container"><Navbar books={this.filterBooks}/>
                <Form books={this.state.books}/></div>)

            }></Route>
            <Route exact path='/edit' render={() => (
                <div className="home-container"><Navbar books={this.filterBooks}/>
                <EditBook book={this.state.selectedBook} handleEdit={this.edit}></EditBook></div>
            )}></Route>

            <Route exact path='/login' render={()=>(
                <div className="home-container"><Login/></div>)
            }></Route>

            <Route exact path='/profile' render={()=>(
                <div><Profile/></div>)
            }></Route>
            
            <Route render={()=>(<NotFound/>)}></Route>
            
            </Switch>
        
        </div>
    )
    
}
}
export default Main;