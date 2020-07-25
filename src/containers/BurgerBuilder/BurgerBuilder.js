import React, { Component } from "react";
import Aux from '../../hoc/Auxiliary/Auxiliary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-instance";
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad: .5,
    cheese: .25,
    bacon: 2,
    meat: 1
};



class BurgerBuilder extends Component{

state ={
    ingredients:null,
    totalPrice: 0,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
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
    this.setState({loading: true});
    const order = {
        ingredients: this.state.ingredients,
        price: this.state.totalPrice,
        customer: {
            name:'My Name',
            address: 'My Address',              
            email: 'My Email'
        },
        deliveryMethod: 'Delivery or Take-Out'
    }
    axios.post('/orders', order)
        .then(response=>{
            this.setState({loading:false, purchasing:false});
        })
        .catch(error=>{
            this.setState({loading:false, purchasing:false});
        });
}

componentDidMount () {
    axios.get('https://react-burgerbuilder-940e7.firebaseio.com/ingredients.json')
    .then(response =>{
        this.setState({ingredients: response.data});
    })
    .catch(error =>{
        this.setState({error:true});
    });
}


    render(){

        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }




        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;

        if (this.state.ingredients){
        burger =(    
            <Aux>
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
        orderSummary = <OrderSummary 
            ingredients={this.state.ingredients}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}/>;
        }
        if (this.state.loading){
            orderSummary = <Spinner/>;
        }
        return (
            <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);