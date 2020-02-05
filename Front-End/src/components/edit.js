import React,{Component} from 'react';
import Navbar from './nav.js';
import {Redirect} from 'react-router-dom';
class EditBook extends Component{
    constructor(){
        super();
        this.state={
            redirect_val: false
        }
        this.editbook=this.editbook.bind(this);

    }
    editbook(event)
    {
        event.preventDefault();
         const idd=event.target.id.value;
         const namee=event.target.name.value;
         const authorr=event.target.author.value;
         const obj={
              id:idd,
              name:namee,
              author:authorr
         }
         //this.props.handleEdit(obj);

        fetch(`http://localhost:8081/books/editBook`,{
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
            this.setState({
                redirect_val: true
            })
        })
        
        

    
    }
    render()
    {
        if(this.state.redirect_val)
        {
            return <Redirect to="/display"></Redirect>
        }
        return <div>
        <fieldset>
            <h1>Edit Details</h1>
            <form className="css-form" onSubmit={this.editbook}>
            BOOK ID:<input type="text" name="id" defaultValue={this.props.book.id} readonly="readonly"></input><br/>
            BOOK NAME:<input type="text" name="name" defaultValue={this.props.book.name}></input><br/>
            BOOK AUTHOR:<input type="text" name="author" defaultValue={this.props.book.author}></input><br/>
            <input type="submit" value="EDIT"/>
        </form>
        </fieldset></div>
    }

}
export default EditBook;