import React from 'react';
import Aux from '../../../hoc/Auxiliary';

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
        </Aux>
    )

};


export default OrderSummary;