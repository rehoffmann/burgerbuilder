import React, { Component } from "react";
import Aux from '../../hoc/Auxiliary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";


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
    totalPrice: 0,
    purchasable: false,
    purchasing: false
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
    this.updatePurchaseState(updatedIngredients);
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
    this.updatePurchaseState(updatedIngredients);
}

purchaseHandler = () => {
    this.setState({purchasing: true});
}

//see lesson 136, if price is more than 0 set purchasable to true
updatePurchaseState (ingredients){
    
    const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        })
        .reduce((sum,el) => {
            return sum + el;
        }, 0);
    this.setState({purchasable: sum > 0});
}

purchaseCancelHandler = () => {
    this.setState({purchasing: false});
}

purchaseContinueHandler = () => {
    alert('Not Able To Continue');
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
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
            <BuildControls
                ingredientAdded = {this.addIngredientHandler}
                ingredientRemoved = {this.removeIngredientHandler}
                disabled = {disabledInfo}
                price= {this.state.totalPrice}
                purchasable = {this.state.purchasable}
                ordering = {this.purchaseHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;