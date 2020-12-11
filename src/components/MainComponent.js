import React from 'react';
import DishDetail from './DishdetailComponent';
import Menu from './MenuComponent';

import {DISHES} from '../shared/dishes';
import {COMMENTS} from '../shared/comments';
import {LEADERS} from '../shared/leaders';
import {PROMOTIONS} from '../shared/promotions';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';

import { Switch, Route, Redirect } from 'react-router-dom';


class Main extends React.Component {

    constructor(props){
      super(props);
      //stores properties related to component that we can 
      // make use of it and update in future
      this.state = {
        dishes: DISHES,
        comments: COMMENTS,
        promotions: PROMOTIONS,
        leaders: LEADERS,
        selectedDish: null
      };
    }
  
    onDishSelect(dishId){
        this.setState({ selectedDish: dishId });   
    }

    render() {

      const HomePage = () => {
        return(
          <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.state.promotions.filter((dish) => dish.featured)[0]}
          leader={this.state.leaders.filter((dish) => dish.featured)[0]} /> 
        );
      }

      const DishWithId = ({match}) => {
        return (
          <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]} 
          comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
          />
        )
      }

      const AboutUs = () => {
        return (
          <About leaders={this.state.leaders} />
        )
      }

      return (
        <div>
          <Header />
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
            <Route path='/menu/:dishId' component={DishWithId} />
            <Route exact path="/contactus" component={Contact}  />
            <Route exact path='/aboutus' component={AboutUs} />
            <Redirect to="/home" />
          </Switch>
          <Footer />
        </div>
      );
    }
   
  }
  
  export default Main;