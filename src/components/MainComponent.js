import React from 'react';
import DishDetail from './DishdetailComponent';
import Menu from './MenuComponent';
import {DISHES} from '../shared/dishes';
import { Navbar, NavbarBrand } from 'reactstrap';


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
      return (
        <div>
          <Navbar dark color="primary">
            <div className="container">
              <NavbarBrand href="/html">Ristorante Con Fusion</NavbarBrand>
            </div>
          </Navbar>
          <Menu 
          dishes={this.state.dishes}
          onClick={(dishId) => this.onDishSelect(dishId)}
          />
          <DishDetail 
          dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish )[0]} />
        </div>
      );
    }
   
  }
  
  export default Main;