import React from 'react';
import DishDetail from './DishdetailComponent';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


class Main extends React.Component {

    constructor(props){
      super(props);
      //stores properties related to component that we can 
      // make use of it and update in future
     }
  
    // onDishSelect(dishId){
    //     this.setState({ selectedDish: dishId });   
    // }

    render() {

      const HomePage = () => {
        return(
          <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.props.promotions.filter((dish) => dish.featured)[0]}
          leader={this.props.leaders.filter((dish) => dish.featured)[0]} /> 
        );
      }

      const DishWithId = ({match}) => {
        return (
          <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]} 
          comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
          />
        )
      }

      const AboutUs = () => {
        return (
          <About leaders={this.props.leaders} />
        )
      }

      return (
        <div>
          <Header />
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
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
  
  const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
  }
  export default withRouter(connect(mapStateToProps)(Main));