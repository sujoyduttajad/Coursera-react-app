import React from 'react';
import {Card,CardImg, CardText, CardBody, CardTitle} from 'reactstrap';
import dateFormat from 'dateformat';

  
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

    function RenderComments({dish}){
        console.log(dish);
        if(dish != null){
            return(
                    <div className="col-lg-6 col-md-6 col-xs-12 spacing">
                        <h4>Comments</h4>
                    {dish.comments.map((com, index) =>    {
                        return(
                            <ul className="list-unstyled" key={index}>
                                <li>
                                    <p>{com.comment}</p>
                                    <p>-- {com.author} , {dateFormat(com.date, "mmmm dS, yyyy")}</p>
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
                    <div className="row"> 
                        <RenderDish dish={props.dish} />
                        <RenderComments dish={props.dish}  />
                    </div>   
                </div>
            )
        
        
    }
        

export default DishDetail;