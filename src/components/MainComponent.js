import React from 'react';
import DishDetail from './DishdetailComponent';
import Menu from './MenuComponent';
import {DISHES} from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';


class Main extends React.Component {

    constructor(props){
      super(props);
      //stores properties related to component that we can 
      // make use of it and update in future
      this.state = {
        dishes: DISHES,
        selectedDish: null
      };
    }
  
    onDishSelect(dishId){
        this.setState({ selectedDish: dishId });   
    }

    render() {

      const HomePage = () => {
        return(
          <Home /> 
        );
      }
      return (
        <div>
          <Header />
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)}/>} />
            <Redirect to="/home" />
          </Switch>
          <DishDetail 
          dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish )[0]} />
          <Footer />
        </div>
      );
    }
   
  }
  
  export default Main;