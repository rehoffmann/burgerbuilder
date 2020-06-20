import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    
    //this could be functional component since it is wrapped by Modal, another class component

    componentDidUpdate(){
        console.log("OrderSummary Did Update");
    }


    render(){

        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
            <li key= {igKey}>
                <span style={{textTransform:'capitalize'}}>{igKey}: </span>{this.props.ingredients[igKey]}
            </li>
            )
        });

        return(     
               <Aux>
            <h2>Your Order:</h2>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: <strong>{this.props.price.toFixed(2)}</strong></p>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>PROCEED TO CHECKOUT</Button>
            <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
        </Aux>)
    }
}

export default OrderSummary;