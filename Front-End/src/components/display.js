import React,{Component} from 'react';
import Book from './book';
import './stylesheet.css';
import {Link} from 'react-router-dom';
class Display extends Component{
    render()
    {
        return (
            <div className="displaypage">
                <table>
                    <thead>
                        <tr>
                            <td><b>BOOK ID</b></td>
                            <td><b>BOOK NAME</b></td>
                            <td><b>BOOK AUTHOR</b></td>
                            <td><b>ACTIONS</b></td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.books.map((book,index)=>{
                        return <Book key={index} book={book} onRemove={this.props.onRemove} sendSelectedBook={this.props.sendSelectedBook}></Book>
                        })}
                    </tbody>
                </table>
            </div>

        )
    }
}
export default Display; 
