import React, { Component } from 'react'
//import {StripeProvider} from 'react-stripe-elements';
import StripeCheckout from 'react-stripe-checkout';
import './styleform.css'
require('dotenv').config()



class Premium extends Component {
    constructor(){
        super();
        this.state={
            cost:0
        }
        this.handleToken=this.handleToken.bind(this);
    }
    setCost(event)
    {
        var a = process.env.REACT_APP_API_KEY
        console.log(a)
        this.setState({
             cost:event.target.value
        })
    }
    handleToken(token)
    {
        alert('Subscribed successfully');
    }
    render() {
        return (
            <div class="form-container">
                <div class="form-body">
                    
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" />
                        <label for="cost">Choose your subscription plan below</label><br/>
                        <div onChange={this.setCost.bind(this)}>
                        <input type="radio" name="cost" value="500"/>3 Months<br/>
                        <input type="radio" name="cost" value="700"/>6 Months<br/>
                        <input type="radio" name="cost" value="999"/>12 Months<br/>
                        
                        </div>
                        
                        <h1><center>INR <span id="totalCost">{this.state.cost}</span></center></h1>
                        <div>
                        
                        </div>
                    
                    <StripeCheckout stripeKey={process.env.REACT_APP_API_KEY} token={this.handleToken} 
                            amount={this.state.cost*100}
                            currency='inr' 
                            name='6th Sense'
                            description= 'Make Your Payment'
                            label= 'Buy Subscription' />
                </div>
            </div>
        )
    }
}

export default Premium;

/*
<input class="upload-button" type="submit" value="Buy Subscription" />*/