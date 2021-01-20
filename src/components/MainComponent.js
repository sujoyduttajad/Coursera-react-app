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
import { postComment, fetchComments, fetchDishes, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators'
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group'

class Main extends React.Component {


    componentDidMount() {
      this.props.fetchDishes();
      this.props.fetchComments();
      this.props.fetchPromos();
      this.props.fetchLeaders();
    } 

    //stores properties related to component that we can 
    // make use of it and update in future
  
    // onDishSelect(dishId){
    //     this.setState({ selectedDish: dishId });   
    // }

    render() {

      const HomePage = () => {
        return(
          <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishErrMess={this.props.dishes.errMess}

          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}

          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMess} 
          
          /> 
        );
      }

      const DishWithId = ({match}) => {
        return (
          <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]} 
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
          />
        )
      }

      const AboutUs = () => {
        return (
          <About leaders={this.props.leaders} 
          isLoading = {this.props.leaders.isLoading}
          errMess = {this.props.leaders.errMess}
          />
        )
      }

      return (
        <div>
          <Header />

          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300} >
              <Switch>
                <Route path="/home" component={HomePage} />
                <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
                <Route path='/menu/:dishId' component={DishWithId} />
                <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />}  />
                <Route exact path='/aboutus' component={AboutUs} />
                <Redirect to="/home" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>

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
  const mapDispatchToProps = (dispatch) => ({
    // the action creator(postComment) will return an action object, that action object is given as a parameter to the dispatch function here
    // dispatch with the parameters are supplied to the mapDispatchToProps function as parameters and which can be used within our component
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    postFeedback: (firstName, lastName, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstName, lastName, telnum, email, agree, contactType, message)),
    fetchDishes: () => {  dispatch(fetchDishes()) },
    resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
    fetchComments: () => {  dispatch(fetchComments()) },
    fetchPromos: () => {  dispatch(fetchPromos()) },
    fetchLeaders: () => {  dispatch(fetchLeaders()) },
  });
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));