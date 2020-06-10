import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) =>{
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
            <li key= {igKey}>
                <span style={{textTransform:'capitalize'}}>{igKey}: </span>{props.ingredients[igKey]}
            </li>
            )
        });
    return(
        <Aux>
            <h2>Your Order:</h2>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: <strong>{props.price.toFixed(2)}</strong></p>
            <Button btnType="Success" clicked={props.purchaseContinued}>PROCEED TO CHECKOUT</Button>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
        </Aux>
    )

};


export default OrderSummary;