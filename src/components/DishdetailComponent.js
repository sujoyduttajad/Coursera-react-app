import React from 'react';
import {Card,CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom'
  
    function RenderDish({dish}){
        if(dish != null) {
            return(
                <div className="col-lg-6 col-md-6 col-xs-12 spacing">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle className="card__title">{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </div>
            );
        }
        else {
            return(
                <div></div>
            );
        }
    }

    function RenderComments({comments}){
        
        if(comments != null){
            return(
                    <div className="col-lg-6 col-md-6 col-xs-12 spacing">
                        <h4>Comments</h4>
                    {comments.map((comment, index) =>    {
                        return(
                            <ul className="list-unstyled" key={index}>
                                <li>
                                    <p>{comment.comment}</p>
                                    <p>-- {comment.author} , {dateFormat(comment.date, "mmmm dS, yyyy")}</p>
                                </li>
                            </ul>
                        );
                    })}
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
                        <RenderComments comments={props.comments}  />
                    </div>   
                </div>
            )
        
        
    }
        

export default DishDetail;