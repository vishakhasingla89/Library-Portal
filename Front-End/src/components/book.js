import React,{Component} from 'react';
import './stylesheet.css';
import {Link} from 'react-router-dom';
class Book extends Component{
    render()
    {
        return (
            <tr>
                <td>{this.props.book.id}</td>
                <td>{this.props.book.name}</td>
                <td>{this.props.book.author}</td>
                <td>
                    <button onClick={()=>this.props.onRemove(this.props.book)}>Remove</button>
                    <button onClick={() => {
                        this.props.sendSelectedBook(this.props.book)
                    }}><Link to="/edit">Edit</Link></button>
                </td>
            </tr>
        )
    }
}
export default Book;
