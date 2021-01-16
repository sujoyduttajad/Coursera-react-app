import React from 'react';
import {Card,CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom'
import CommentFormComponent from './CommentFormComponent';
import Loading from './LoadingComponent';
import { baseURL } from '../shared/baseURL';
import { FadeTransform, Fade, Stagger } from 'react-animation-components'

    function RenderDish({dish}){
        if(dish != null) {
            return(
                <div className="col-lg-6 col-md-6 col-xs-12 spacing">
                    <FadeTransform in
                            transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}>    
                        <Card>
                            <CardImg width="100%" src={baseURL + dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle className="card__title">{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </FadeTransform>
                </div>
            );
        }
        else {
            return(
                <div></div>
            );
        }
    }

    function RenderComments({comments, postComment, dishId}){
        
        if(comments != null){
            return(
                    <div className="col-lg-6 col-md-6 col-xs-12 spacing">
                        <h4>Comments</h4>
                        <ul className="list-unstyled" >
                            <Stagger in>
                                {comments.map((comment) =>    {
                                return(     
                                    <Fade in>                               
                                        <li key={comment.id}>
                                            <p>{comment.comment}</p>
                                            <p>-- {comment.author} , {dateFormat(comment.date, "mmmm dS, yyyy")}</p>
                                        </li>       
                                    </Fade>                           
                                    );
                                })}
                            </Stagger>
                        </ul>
                        <CommentFormComponent dishId={dishId} postComment={postComment} />
                    </div>
                )
            }
        else {
            return(
                <div></div>
            );
        }
    }
  
   
    const DishDetail = (props) => {

        if(props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        } 

        else if(props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            )
        }
        
        else if(props.dish != null) {
            return(
                <div className="container">
                    <div className='row'>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>  
                        <div className='col-12'>
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row"> 
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.comments} 
                            postComment={props.postComment}
                            dishId={props.dish.id}
                        />
                    </div>   
                </div>
            )
        }
        
    }
        

export default DishDetail;