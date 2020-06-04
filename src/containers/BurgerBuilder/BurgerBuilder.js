import React, { Component } from "react";
import Aux from '../../hoc/Auxiliary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';


const INGREDIENT_PRICES = {
    salad: .5,
    cheese: .25,
    bacon: 2,
    meat: 1
};



class BurgerBuilder extends Component{

state ={
    ingredients:{
        meat: 0,
        salad: 0,
        cheese: 0,
        bacon: 0
    },
    totalPrice: 0
}

addIngredientHandler = (type) => {
    const currentCount = this.state.ingredients[type];
    const updatedCount = currentCount + 1;
    const updatedIngredients = {
        ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const currentPrice = this.state.totalPrice;
    const newPrice = currentPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
}

removeIngredientHandler = (type) => {
    const currentCount = this.state.ingredients[type];
    if (currentCount <= 0) {
        return;
    } 
    const updatedCount = currentCount - 1;
    const updatedIngredients = {
        ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceSubtraction = INGREDIENT_PRICES[type];
    const currentPrice = this.state.totalPrice;
    const newPrice = currentPrice - priceSubtraction;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
}


    render(){

        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
            <BuildControls
                ingredientAdded = {this.addIngredientHandler}
                ingredientRemoved = {this.removeIngredientHandler}
                disabled = {disabledInfo}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;